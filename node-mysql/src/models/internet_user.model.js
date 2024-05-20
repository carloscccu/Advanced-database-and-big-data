const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Internet_user = sequelize.define('Internet_user', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    region: DataTypes.STRING
}, {
    tableName: 'Internet_user',
    timestamps: false
});

module.exports = Internet_user;
