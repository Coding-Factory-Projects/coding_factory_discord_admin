export interface Promotion {
  id: number;
  name: string;
  campus: string;
  start_year: number;
  end_year: number;
  archived: boolean;
  creation_date: Date;
  students: [];
}

const API_URL = process.env.API_URL;

export async function getPromotions(): Promise<Array<Promotion>> {
  const request = await fetch(`${API_URL}/promotions`);
  const json = await request.json();

  return json;
}