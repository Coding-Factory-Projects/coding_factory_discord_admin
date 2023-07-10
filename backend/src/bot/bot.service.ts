import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Promotion } from 'src/promotions/entities/promotion.entity';

class PromotionNotCreated extends Error {}
class PromotionNotUpdated extends Error {}
class PromotionNotArchived extends Error {}

@Injectable()
export class BotService {
  constructor(private readonly configService: ConfigService) {}

  async createBotPromotion(promotion: Promotion): Promise<string> {
    const request = await fetch(
      `${this.configService.get('BOT_API_URL')}/on-promotion-created`,
      { method: 'POST', body: JSON.stringify(promotion) },
    );
    const json = await request.json();

    if (!request.ok) {
      console.error(
        'An http error happened while creating the promotion on the server !',
        json,
      );
      throw new PromotionNotCreated(promotion.name);
    }
    console.log('Promotion created on the bot');

    const { roleId } = json;
    return roleId;
  }

  async onPromotionUpdated(promotion: Promotion) {
    const request = await fetch(
      `${this.configService.get('BOT_API_URL')}/on-promotion-updated`,
      { method: 'POST', body: JSON.stringify(promotion) },
    );
    const json = await request.json();

    if (!request.ok) {
      console.error(
        'An http error happened while updating the promotion on the server !',
        json,
      );
      throw new PromotionNotUpdated(promotion.name);
    }
    console.log('Promotion updated on the bot');
  }

  async onPromotionArchived(promotion: Promotion) {
    const request = await fetch(
      `${this.configService.get('BOT_API_URL')}/archive-promotion`,
      { method: 'POST', body: JSON.stringify(promotion) },
    );
    const json = await request.json();

    if (!request.ok) {
      console.error(
        'An http error happened while creating the promotion on the server !',
        json,
      );
      throw new PromotionNotArchived(promotion.name);
    }
  }

  async onNextYear(promotion: Promotion) {
    const request = await fetch(
      `${this.configService.get('BOT_API_URL')}/next-year`,
      { method: 'POST', body: JSON.stringify(promotion) },
    );
    const json = await request.json();

    if (!request.ok) {
      console.error(
        'An http error happened while making the promotion next year !',
        json,
      );
      throw new PromotionNotUpdated(promotion.name);
    }
  }
}
