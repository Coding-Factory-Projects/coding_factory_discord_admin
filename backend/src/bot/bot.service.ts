import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Promotion } from 'src/promotions/entities/promotion.entity';

class PromotionNotCreated extends Error {}

@Injectable()
export class BotService {
  constructor(private readonly configService: ConfigService) {}

    async createBotPromotion(promotion: Promotion) {
        const request = await fetch(`${this.configService.get("BOT_API_URL")}/on-promotion-created`, { method: "POST", body: JSON.stringify(promotion) });
        const json = request.json();
        
        if (!request.ok) {
            console.error("An http error happened while creating the promotion on the server !")
            console.error(json);
            throw new PromotionNotCreated(promotion.name);
        }

        console.log("Promotion created on the bot");
    }
}
