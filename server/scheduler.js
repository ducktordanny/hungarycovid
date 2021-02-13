const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const URL = 'https://koronavirus.gov.hu';
const { MONGO_DB_URL } = process.env;
const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });

const today = new Date();
today.setSeconds(0);
today.setMilliseconds(0);

const convertData = (data) => {
   return parseInt(data.text().split(' ').join(''));
}

const fetchTodayDatas = async () => {
   // console.log('Fetching datas...');

   const response = await fetch(URL);
   const body = await response.text();

   const $ = cheerio.load(body);

   const activeInfectedBudapest = convertData($('#api-fertozott-pest'));
   const activeInfectedCountry = convertData($('#api-fertozott-videk'));
   const activeInfectedGlobal = convertData($('#api-fertozott-global'));
   const activeInfected = activeInfectedBudapest + activeInfectedCountry;

   const recoveredBudapest = convertData($('#api-gyogyult-pest'));
   const recoveredCountry = convertData($('#api-gyogyult-videk'));
   const recoveredGlobal = convertData($('#api-gyogyult-global'));
   const recovered = recoveredBudapest + recoveredCountry;

   const deceasedBudapest = convertData($('#api-elhunyt-pest'));
   const deceasedCountry = convertData($('#api-elhunyt-videk'));
   const deceasedGlobal = convertData($('#api-elhunyt-global'));
   const deceased = deceasedBudapest + deceasedCountry;

   const infected = activeInfected + recovered + deceased;

   const quarantined = convertData($('#api-karantenban'));
   const tested = convertData($('#api-mintavetel'));

   const covid = {
      activeInfectedBudapest,
      activeInfectedCountry,
      activeInfectedGlobal,
      activeInfected,
      recoveredBudapest,
      recoveredCountry,
      recoveredGlobal,
      recovered,
      deceasedBudapest,
      deceasedCountry,
      deceasedGlobal,
      deceased,
      infected,
      quarantined,
      tested
   }

   const policeAction = {
      curfew: convertData($('#api-rendezvenyek-szam')),
      quarantine: convertData($('#api-hatosagi-hazi-karanten-szam')),
      maskWearing: convertData($('#api-maszkviseles-szam')),
      storeOpeningHours: convertData($('#api-uzletek-szam')),
      travelling: convertData($('#api-utazasi-korlatozasok-szam')),
      shopsRestaurantsPubs: convertData($('#api-rendorseg-szam')),
   }
   const lastUpdateInHungary = new Date($('.view-footer .bg-even #block-block-1 .well-lg p').text().replace('Legutolsó frissítés dátuma: ', '').trim());
   const lastUpdateInWorld = new Date($('.view-footer .bg-even #block-block-2 .well-lg p').text().replace('Legutolsó frissítés dátuma: ', '').trim());

   // get map
   // console.log('Fetching map...');

   const mapResponse = await fetch(`${URL}/terkepek/fertozottek`);
   const mapBody = await mapResponse.text();
   const $map = cheerio.load(mapBody);

   const countyMap = $map('.view-terkepek .view-content img').attr('src');

   const scrappedData = {
      covid,
      policeAction,
      countyMap,
      lastUpdateInHungary,
      lastUpdateInWorld,
      lastUpdateInApi: today
   }

   const db = client.db('covid_datas');
   const collection = db.collection('test');

   // console.log('Get last data...');
   const dbRes = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();
   let doc = dbRes[0];

   // verify if changing is necessary...
   const lastUpdateHungaryDB = doc ? new Date(doc.lastUpdateInHungary) : null;
   const lastUpdateWorldDB = doc ? new Date(doc.lastUpdateInWorld) : null;

   // collection.deleteMany({ lastUpdateInWorld: new Date('1970-01-01T00:00:00.000+00:00') });

   if (doc && isDateEqual(lastUpdateInHungary, lastUpdateHungaryDB) && isDateEqual(lastUpdateInWorld, lastUpdateWorldDB)) {
      console.log('Change is unnecessary...');
   } else {
      // if (lastUpdateInHungary.getDate() === new Date().getDate())
      if (doc && (lastUpdateHungaryDB.getDate() === lastUpdateInHungary.getDate() || lastUpdateWorldDB.getDate() === lastUpdateInWorld.getDate())) {
         await collection.deleteOne({ _id: doc._id });
         console.log('Unnecessary data has been removed...');
         const dbResNewLast = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();
         doc = dbResNewLast[0];
      }
      // console.log(lastUpdateHungaryDB, lastUpdateHungary, lastUpdateWorldDB, lastUpdateWorld);
      scrappedData.covid['infectedToday'] = doc ? scrappedData.covid.infected - doc.covid.infected : null;
      scrappedData.covid['testedToday'] = doc ? scrappedData.covid.tested - doc.covid.tested : null;
      scrappedData.covid['deceasedToday'] = doc ? scrappedData.covid.deceased - doc.covid.deceased : null;

      await collection.insertOne(scrappedData);
      console.log('New data inserted to database...');
            
      if (lastUpdateInHungary.getDate() === today.getDate()) {
         // insert new Data

         // remove all records older than 7days
         const sevenDaysLater = new Date(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString());
         await collection.deleteOne({ lastUpdateInApi: { "$lt": sevenDaysLater } });
      }
   }
}
  
const isDateEqual = (date1, date2) => {
   return date1.toString() === date2.toString();
}

const run = async () => {
   try {
      console.log('Try to connect to database...');
      await client.connect();
      console.log('Connected correctly to server...');
      await fetchTodayDatas();
   } catch (err) {
      console.log(err.stack);
   } finally {
      await client.close();
      console.log('Database closed.');
   }
}
run().catch(console.dir);