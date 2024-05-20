const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Country = sequelize.define('Country', {
    code: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
    language: DataTypes.STRING
}, {
    tableName: 'Country',
    timestamps: false
});

module.exports = Country;
