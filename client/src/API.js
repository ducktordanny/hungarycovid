const URL = 'http://localhost:5000/covid_datas';

export async function getDatas() {
   const response = await fetch(URL);
   return response.json();
}