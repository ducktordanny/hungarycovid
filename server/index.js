const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

let cachedData = null;
let cachedTime = null;

app.get('/', async (req, res) => {
   if (cachedTime && cachedTime > Date.now() - 60 * 1000) {
      res.send(cachedData);
   } else {
      const { MongoClient } = require('mongodb');
      const DB_URL = process.env.MONGO_DB_URL;
      const client = await new MongoClient(DB_URL, { useUnifiedTopology: true });
      try {
   
         console.log('Try to connect to database...');
         await client.connect();
         console.log('Connected correctly to server...');
   
         const db = client.db('covid_datas');
         const collection = db.collection('test');
   
         const response = await collection.find().toArray();
         console.log('Data received...')
   
         cachedData = response;
         cachedTime = Date.now();
   
         await res.send(response);
   
      } catch (err) {
         console.log(err.stack);
         console.log(err.message);
      } finally {
         await client.close();
         console.log('Database closed.');
      }
   }
   
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Listening to port ${PORT}`);
})