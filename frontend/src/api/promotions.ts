export interface Promotion {
  id: number;
  name: string;
  campus: string;
  start_year: number;
  end_year: number;
  discord_role_id: string;
  archived: boolean;
  creation_date: Date;
  students: [];
}

const API_URL = process.env.API_URL;

export async function getPromotions(): Promise<Array<Promotion>> {
  const request = await fetch(`${API_URL}/promotions`);
  const json = await request.json();

  if (request.status !== 200) {
    throw new Error(json.message)
  }

  return json;
}