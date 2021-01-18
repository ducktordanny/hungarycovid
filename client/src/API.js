const URL = 'https://hungary-covid-api.herokuapp.com/';

export async function getDatas() {
   const response = await fetch(URL);
   return response.json();
}