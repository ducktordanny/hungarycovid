require('dotenv').config();

const date = new Date()
console.log(date.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));