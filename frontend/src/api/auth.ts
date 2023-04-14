
import Cookie from "js-cookie";

export async function login(email: string, password: string) {
  const request = await fetch(`/api/auth/login`, { 
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const json: any = await request.json();
  if (!request.ok) {
    throw { status: request.status, message: json.message };
  }

  Cookie.set('token', json.access_token);
  return json;
}