const xlsx = require('xlsx');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// MySQL connection
const sequelize = new Sequelize('moviesdb', 'user', 'userpassword', {
    host: 'mysql',  // Use the service name defined in docker-compose.yml
    dialect: 'mysql',
    retry: {
        match: [
            /ECONNREFUSED/,
            /ETIMEDOUT/,
        ],
        name: 'query',
        backoffBase: 100,
        backoffExponent: 1.1,
        timeout: 60000,
        max: Infinity,
    },
});

// Define models according to the schema
const Country = sequelize.define('Country', {
    code: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    language: DataTypes.STRING
}, { tableName: 'Country', timestamps: false });

const Movie = sequelize.define('Movie', {
    movieId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    summary: DataTypes.TEXT,
    producerId: DataTypes.INTEGER,
    countryCode: DataTypes.STRING
}, { tableName: 'Movie', timestamps: false });

const Artist = sequelize.define('Artist', {
    artistId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    DOB: DataTypes.DATEONLY // Ensure correct date format
}, { tableName: 'Artist', timestamps: false });

const Role = sequelize.define('Role', {
    movieId: { type: DataTypes.INTEGER, primaryKey: true },
    actorId: { type: DataTypes.INTEGER, primaryKey: true },
    roleName: DataTypes.STRING
}, { tableName: 'Role', timestamps: false });

const Internet_user = sequelize.define('Internet_user', {
    email: { type: DataTypes.STRING, primaryKey: true },
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    region: DataTypes.STRING
}, { tableName: 'Internet_user', timestamps: false });

const Score_movie = sequelize.define('Score_movie', {
    email: { type: DataTypes.STRING, primaryKey: true },
    movieId: { type: DataTypes.INTEGER, primaryKey: true },
    score: DataTypes.INTEGER
}, { tableName: 'Score_movie', timestamps: false });

// Read data from Excel file
const workbook = xlsx.readFile(path.join(__dirname, 'MoviesData.xlsx'));
const loadData = (sheetName) => xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Sanitize data
const sanitizeDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : dateString;
};

const sanitizeData = (data) => {
    return data.map(item => {
        if (item.DOB) {
            item.DOB = sanitizeDate(item.DOB);
        }
        return item;
    });
};

// Populate MySQL tables
const populateMySQL = async () => {
    try {
        await sequelize.sync({ force: true });

        await Country.bulkCreate(loadData('Country Table').slice(4));
        await Movie.bulkCreate(loadData('Movie Table').slice(4));
        await Artist.bulkCreate(sanitizeData(loadData('Artist Table').slice(4))); // Sanitize artist data
        await Role.bulkCreate(loadData('Role Table').slice(4));
        await Internet_user.bulkCreate(loadData('Internet_user Table').slice(4));
        await Score_movie.bulkCreate(loadData('Score_movie Table').slice(4));

        console.log('Data successfully loaded into MySQL');
    } catch (error) {
        console.error('Error loading data into MySQL:', error);
    } finally {
        await sequelize.close();
    }
};

populateMySQL();
