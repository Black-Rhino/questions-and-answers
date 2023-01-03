const express = require('express');
const app = express();
require('dotenv').config();
const csv = require('csv-parser');
const fs = require('fs');
const { Question } = require('./db.js');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT);
console.log(`Listening on PORT ${process.env.PORT}`);
