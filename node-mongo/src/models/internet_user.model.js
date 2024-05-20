const mongoose = require('mongoose');

const InternetUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    surname: { type: String, required: true },
    name: { type: String, required: true },
    region: { type: String, required: true }
});

module.exports = mongoose.model('User', InternetUserSchema, 'internet_user');