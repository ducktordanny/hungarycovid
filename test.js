const { text } = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());

const test = new Promise(async (req, resasd) => {
   resasd('asdasdasda');
});

test.then(asd => {
   console.log(asd.message);
})