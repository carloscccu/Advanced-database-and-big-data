const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Artist = sequelize.define('Artist', {
    artistId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    DOB: DataTypes.DATE
}, {
    tableName: 'Artist',
    timestamps: false
});

module.exports = Artist;
