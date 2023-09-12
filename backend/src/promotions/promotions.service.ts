import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { Student } from './entities/student.entity';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionsRepository: Repository<Promotion>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createPromotionDto: any) {
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

  async toNewYear() {
    // Get all the year's promotions
    const yearPromotions = await this.promotionsRepository
      .createQueryBuilder()
      .andWhere('start_year <= :current_year')
      .andWhere('end_year > :current_year')
      .setParameters({ current_year: new Date().getFullYear() })
      .getMany();

    return Promise.all(
      yearPromotions.map(async (promotion) => {
        if (['M2', 'L3'].includes(promotion.name)) {
          return;
        }

        const matchResult = promotion.name.match('\\d');
        if (matchResult.length == 0) {
          return Promise.reject();
        }

        const promotionYear = parseInt(matchResult[0]) + 1;

        // Update the promotions names
        return this.promotionsRepository.update(
          { id: promotion.id },
          {
            name: promotion.name.replace(
              matchResult[0],
              promotionYear.toString(),
            ),
          },
        );
      }),
    );
  }

  findAll(): Promise<Promotion[]> {
    return this.promotionsRepository.find({ where: { archived: false } });
  }

  findOne(id: number): Promise<Promotion> {
    return this.promotionsRepository.findOne({ where: { id } });
  }

  update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return this.promotionsRepository.update(id, updatePromotionDto);
  }

  async archive(id: number) {
    const entity = await this.findOne(id);
    entity.archived = true;
    return this.promotionsRepository.update({ id }, entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    return this.promotionsRepository.remove(entity);
  }
}
