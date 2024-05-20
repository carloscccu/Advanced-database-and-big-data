const mongoose = require('mongoose');
const xlsx = require('xlsx');
const path = require('path');

// MongoDB connection with increased timeout and retry mechanism
const connectWithRetry = async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/moviesdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 120000,
            socketTimeoutMS: 120000,
        });
        console.log('Connected to MongoDB');
        await populateMongoDB();
    } catch (err) {
        console.error('Failed to connect to MongoDB on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
    }
};

const Country = require('./node-mongo/src/models/country.model');
const Movie = require('./node-mongo/src/models/movie.model');
const Artist = require('./node-mongo/src/models/artist.model');
const Role = require('./node-mongo/src/models/role.model');
const Internet_user = require('./node-mongo/src/models/internet_user.model');
const Score_movie = require('./node-mongo/src/models/score_movie.model');

// Read data from Excel file
const workbook = xlsx.readFile(path.join(__dirname, 'MoviesData.xlsx'));
const loadData = (sheetName) => xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

const sanitizeData = (data, headers) => {
    return data.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index] || "Unknown"; // Default value for missing fields
        });
        return obj;
    });
};

const insertData = async (Model, sheetName, headers) => {
    const data = loadData(sheetName);
    const sanitizedData = sanitizeData(data.slice(1), headers); // Skip header row
    await Model.insertMany(sanitizedData);
    console.log(`Inserted data into ${Model.collection.collectionName}`);
};

// Populate MongoDB collections
const populateMongoDB = async () => {
    try {
        console.log('Dropping database...');
        await mongoose.connection.dropDatabase();

        console.log('Inserting countries...');
        const countryData = sanitizeData(loadData('Country Table').slice(4), ['code', 'name', 'language']);
        await insertData(Country, 'Country Table', ['code', 'name', 'language']);

        console.log('Inserting movies...');
        await insertData(Movie, 'Movie Table', ['movieId', 'title', 'year', 'genre', 'summary', 'producerId', 'countryCode']);

        console.log('Inserting artists...');
        await insertData(Artist, 'Artist Table', ['artistId', 'surname', 'name', 'DOB']);

        console.log('Inserting roles...');
        await insertData(Role, 'Role Table', ['movieId', 'actorId', 'roleName']);

        console.log('Inserting internet users...');
        await insertData(Internet_user, 'Internet_user Table', ['email', 'surname', 'name', 'region']);

        console.log('Inserting score movies...');
        await insertData(Score_movie, 'Score_movie Table', ['email', 'movieId', 'score']);

        console.log('Data successfully loaded into MongoDB');
    } catch (error) {
        console.error('Error loading data into MongoDB:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Initial call to connect with retry mechanism
connectWithRetry();
