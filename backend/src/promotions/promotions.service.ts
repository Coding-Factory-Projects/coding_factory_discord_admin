import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { Student } from './entities/student.entity';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionsRepository: Repository<Promotion>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const promotion = await manager.save(Promotion, createPromotionDto);
      for (const student of createPromotionDto.students) {
        await manager.save(Student, { ...student, promotion });
      }
    });

    const promotions = await this.promotionsRepository.find({
      order: { id: 'DESC' },
      relations: ['students'],
    });
    return promotions[0];
  }

  findAll(): Promise<Promotion[]> {
    return this.promotionsRepository.find();
  }

  findOne(id: number): Promise<Promotion> {
    return this.promotionsRepository.findOne({ where: { id } });
  }

  update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return `This action updates a #${id} promotion`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
