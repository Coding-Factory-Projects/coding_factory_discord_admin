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
import { AuthGuard } from 'src/auth/auth.guard';
import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';
import { BotService } from 'src/bot/bot.service';

@Controller('promotions')
export class PromotionsController {
  constructor(
    private readonly promotionsService: PromotionsService,
    private readonly botService: BotService,
  ) {}

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
      await this.botService.createBotPromotion(result);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionsService.update(+id, updatePromotionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionsService.remove(+id);
  }
}
