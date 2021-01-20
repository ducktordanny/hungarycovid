const URL = 'https://hungary-covid-api.vercel.app/';

export async function getDatas() {
   const response = await fetch(URL);
   return response.json();
}