const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    language: { type: String, required: true }
});

module.exports = mongoose.model('Country', CountrySchema);
