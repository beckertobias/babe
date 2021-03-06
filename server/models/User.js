'use strict';

const mongoose = require('.');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  partner: { type: String, required: true },
  partnerEmail: { type: String, required: true },
  currency: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };