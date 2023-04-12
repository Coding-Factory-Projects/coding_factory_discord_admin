import { Promotion } from "@/api/promotions";

export type PromotionsByYear = Array<{ start_year: number, end_year: number, promotions: Array<Promotion> }>

function needToBeAddedInNewCategory(promotion: Promotion, promotionsByYear: PromotionsByYear): boolean {
  return promotionsByYear.findIndex((item) => item.start_year === promotion.start_year && item.end_year === promotion.end_year) == -1
}

export function buildYearlyPromotions(promotions: Array<Promotion>): PromotionsByYear {
  let promotionsByYear: PromotionsByYear = [];

  for(let promotion of promotions) {
    if (needToBeAddedInNewCategory(promotion, promotionsByYear)) {
      promotionsByYear.push({
        start_year: promotion.start_year,
        end_year: promotion.end_year,
        promotions: [
          promotion
        ]
      });
      continue;
    }

    for(let i = 0; i < promotionsByYear.length; i++) {
      if (promotion.start_year === promotionsByYear[i].start_year && promotion.end_year === promotionsByYear[i].end_year) {
        promotionsByYear[i].promotions.push(promotion);
      }
    }
  }

  return promotionsByYear;
}