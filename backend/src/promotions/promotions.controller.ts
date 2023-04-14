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

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('students_file'))
  create(
    @Body() createPromotionDto: CreatePromotionDto,
    @UploadedFile() studentsList: Express.Multer.File,
  ) {
    console.log(createPromotionDto, studentsList);
    return this.promotionsService.create({ ...createPromotionDto, students: [] });
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
