import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { HttpService } from '@nestjs/axios';

class PromotionNotCreated extends Error {}
class PromotionNotUpdated extends Error {}
class PromotionNotArchived extends Error {}

@Injectable()
export class BotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async createBotPromotion(promotion: Promotion): Promise<string> {
    try {
      const request = await this.httpService
        .post(
          `${this.configService.get('BOT_API_URL')}/on-promotion-created`,
          promotion,
        )
        .toPromise();
      const data = request.data;

      const { roleId } = data as any;
      console.log('Promotion created on the bot', data);
      return roleId;
    } catch (e) {
      console.error(
        'An http error happened while creating the promotion on the server !',
      );
      throw new PromotionNotCreated(promotion.name);
    }
  }

  async onPromotionUpdated(promotion: Promotion) {
    try {
      const request = await this.httpService
        .post(
          `${this.configService.get('BOT_API_URL')}/on-promotion-updated`,
          promotion,
        )
        .toPromise();
      const json = request.data;

      console.log('Promotion updated on the bot', json);
    } catch (e) {
      console.error(
        'An http error happened while updating the promotion on the server !',
        e,
      );
      throw new PromotionNotUpdated(promotion.name);
    }
  }

  async onPromotionArchived(promotion: Promotion) {
    try {
      const request = await this.httpService
        .post(`${this.configService.get('BOT_API_URL')}/archive-promotion`, {
          roleId: promotion.discord_role_id,
        })
        .toPromise();
      const json = request.data;

      console.log('Promotion updated on the bot', json);
    } catch (e) {
      console.error(
        'An http error happened while updating the promotion on the server !',
        e,
      );
      throw new PromotionNotArchived(promotion.name);
    }
  }

  async onNextYear() {
    try {
      const request = await this.httpService
        .post(`${this.configService.get('BOT_API_URL')}/next-year`, {})
        .toPromise();
      const json = request.data;
      console.log(json);
    } catch (e) {
      console.error(
        'An http error happened while making the promotion next year !',
        e,
      );
    }
  }
}
