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

export async function makePromotionsNewYear(apiUrl: string, token: string): Promise<Array<Promotion>> {
  const request = await fetch(`${apiUrl}/promotions/new-year`, { headers: { 'Authorization': `Bearer ${token}` } });
  const json = await request.json();

  if (request.status !== 200) {
    throw json.message;
  }

  return json;
}

export async function createPromotion(token: string, promotionName: string, campus: string, startYear: number, endYear: number, studentsFile: File) {
  const body = new FormData()
  body.append('name', promotionName);
  body.append('campus', campus);
  body.append('start_year', startYear.toString());
  body.append('end_year', endYear.toString());
  body.append('students_file', studentsFile);

  const request = await fetch(`/api/promotions`, {
    method: "POST", 
    headers: { 'Authorization': `Bearer ${token}` },
    body 
  });
  const json = await request.json();

  if (request.status !== 200) {
    throw json.message;
  }

  return json;
}