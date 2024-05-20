const Movie = require('../models/movie.model');

// Get all movies
exports.findAll = async (req, res) => {
    try {
        const movies = await Movie.find(); // or Movie.findAll() for MySQL
        console.log(movies);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Other CRUD operations can be added here
