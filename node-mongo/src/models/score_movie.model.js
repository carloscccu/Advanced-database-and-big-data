const mongoose = require('mongoose');

const ScoreMovieSchema = new mongoose.Schema({
    email: { type: String, ref: 'Internet_user', required: true },
    movieId: { type: Number, ref: 'Movie', required: true },
    score: { type: Number, required: true }
});


module.exports = mongoose.model('Score', ScoreMovieSchema, 'score_movie');