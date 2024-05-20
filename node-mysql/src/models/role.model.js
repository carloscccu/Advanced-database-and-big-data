const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Movie = require('./movie.model');
const Artist = require('./artist.model');

const Role = sequelize.define('Role', {
    movieId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Movie,
            key: 'movieId'
        }
    },
    actorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Artist,
            key: 'artistId'
        }
    },
    roleName: DataTypes.STRING
}, {
    tableName: 'Role',
    timestamps: false
});

module.exports = Role;
