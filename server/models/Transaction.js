'use strict';

const mongoose = require('.');

const TransactionSchema = new mongoose.Schema({
  lender: { type: String, required: true }, //should be email
  addedBy: { type: String, required: true }, //should be email
  amount: { type: Number, required: true },
  item: { type: String, required: true },
  date: { type: Date, required: true },
  split: { type: Number, required: true },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = { Transaction };