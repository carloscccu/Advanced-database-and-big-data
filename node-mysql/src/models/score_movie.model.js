const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Internet_user = require('./internet_user.model');
const Movie = require('./movie.model');

const Score_movie = sequelize.define('Score_movie', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: Internet_user,
            key: 'email'
        }
    },
    movieId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Movie,
            key: 'movieId'
        }
    },
    score: DataTypes.INTEGER
}, {
    tableName: 'Score_movie',
    timestamps: false
});

module.exports = Score_movie;
