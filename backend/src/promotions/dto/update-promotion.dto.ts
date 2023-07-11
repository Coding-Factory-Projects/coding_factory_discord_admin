import { PartialType } from '@nestjs/mapped-types';
import { Promotion } from '../entities/promotion.entity';

export class UpdatePromotionDto extends PartialType(Promotion) {}
