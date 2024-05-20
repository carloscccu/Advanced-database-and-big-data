const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieId: Number,
  title: String,
  year: Number,
  producerId: Number,
  genre: String,
  summary: String,
  countryCode: String
});

module.exports = mongoose.model('Movie', movieSchema, 'movie');

