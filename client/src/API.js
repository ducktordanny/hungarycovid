const URL = 'https://hungary-covid-api.vercel.app/';
// const URL = 'http://localhost:5000/';

export async function getDatas() {
   const response = await fetch(URL);
   return response.json();
}