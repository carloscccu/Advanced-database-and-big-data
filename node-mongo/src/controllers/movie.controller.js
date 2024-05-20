const Movie = require('../models/movie.model');

// Get all movies
exports.findAll = async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log(movies, 'SELECT * FROM Movie');
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
