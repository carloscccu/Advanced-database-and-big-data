const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Movie = sequelize.define('Movie', {
    movieId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER },
    genre: { type: DataTypes.STRING },
    summary: { type: DataTypes.TEXT },
    producerId: { type: DataTypes.INTEGER },
    countryCode: { type: DataTypes.STRING }
}, {
    tableName: 'Movie',
    timestamps: false
});

module.exports = Movie;
