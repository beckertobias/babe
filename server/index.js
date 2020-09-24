/* eslint no-console: 0 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const router = require('./router');
const PORT = 3001;

const Transaction = require('./model');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('---> Connected to MongoDB 🚀'); //
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`---> Server listening on http://localhost:${PORT} 🤘`);
});
