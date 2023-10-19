import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { AuthGuard, Public } from 'src/auth/auth.guard';
import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';
import { BotService } from 'src/bot/bot.service';

@Controller('promotions')
export class PromotionsController {
  constructor(
    private readonly promotionsService: PromotionsService,
    private readonly botService: BotService,
  ) {}

  @Public()
  @Patch('students')
  async updateStudentDiscordTag(
    @Body() updateStudentDto: { email: string; discord_id: string },
  ) {
    const result = await this.promotionsService.updateStudentId(
      updateStudentDto.email,
      updateStudentDto.discord_id,
    );
    return result;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('students_file', {
      dest: './students',
    }),
  )
  async create(
    @Body() createPromotionDto: CreatePromotionDto,
    @UploadedFile() studentsList: Express.Multer.File,
  ) {
    const result = await this.promotionsService.create({
      ...createPromotionDto,
      students: await this.getStudentsList(studentsList),
    });

    try {
      const role_id = await this.botService.createBotPromotion(result);
      await this.promotionsService.update(result.id, {
        discord_role_id: role_id,
      });
    } catch (e) {
      await this.promotionsService.remove(result.id);
    }

    return result;
  }

  private async getStudentsList(
    studentsListFile: Express.Multer.File,
  ): Promise<any[]> {
    const stream = createReadStream(studentsListFile.path);
    return new Promise((resolve, reject) => {
      const lines = [];
      stream
        .pipe(
          csvParser({
            headers: ['lastName', 'firstName', 'email'],
            separator: ';',
          }),
        )
        .on('data', (data) => lines.push(data))
        .on('error', (err) => reject(err))
        .on('end', () => {
          lines.shift();
          resolve(lines);
        });
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.promotionsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/new-year')
  async handleNewYear() {
    try {
      await this.promotionsService.toNewYear();
      await this.botService.onNextYear();

      return {
        message: "Le passage à la nouvelle année s'est bien passé",
      };
    } catch (exception) {
      return {
        error: "Une erreur s'est produite !",
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    // TODO: Update a promotion
    return this.promotionsService.update(+id, updatePromotionDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.promotionsService.archive(+id);
    const archivedPromotion = await this.promotionsService.findOne(+id);
    await this.botService.onPromotionArchived(archivedPromotion);
    return result;
  }
}
