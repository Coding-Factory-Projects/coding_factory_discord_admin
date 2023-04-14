import Cookie from "js-cookie";

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

export async function getPromotions(token: string): Promise<Array<Promotion>> {
  const request = await fetch(`${API_URL}/promotions`, { headers: { 'Authorization': `Bearer ${token}` } });
  const json = await request.json();

  if (request.status !== 200) {
    throw json.message;
  }

  return json;
}