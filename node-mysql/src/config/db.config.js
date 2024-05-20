// config/db.config.js

module.exports = {
    HOST: 'localhost',
    USER: 'user',
    PASSWORD: 'userpassword',
    DB: 'moviesdb',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
