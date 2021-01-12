const express = require('express');
const cors = require('cors');
const database = require('./db.js');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.json({'message': 'Hello Ducks! 🐣'});
})

app.get('/covid_datas', async (req, res) => {
   const { MongoClient } = require('mongodb');
   const { MONGO_DB_PASSWORD, MONGO_DB_NAME } = process.env;
   const DB_URL = `mongodb+srv://Dnyyy:${MONGO_DB_PASSWORD}@cluster0.k6gho.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
   const client = await new MongoClient(DB_URL, { useUnifiedTopology: true });
   try {
      console.log('Try to connect to database...');
      await client.connect();
      console.log('Connected correctly to server...');

      const db = client.db('covid_datas');
      const collection = db.collection('test');

      const response = await collection.find().toArray();
      // const datas = response[0];
      console.log('Data received...')

      await res.send(response);
   } catch (err) {
      console.log(err.stack);
   } finally {
      await client.close();
      console.log('Database closed.');
   }
});

app.get('/database/update', async (req, res) => {
   await database();
   res.json('Database verification success...');
});

const PORT = 5000;
app.listen(PORT, () => {
   console.log(`Listening to port ${PORT}`);
})