const express = require('express');
const path = require('path');
const fs = require('fs');
const sequelize = require('./src/config/db');

const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Read and execute SQL files
const executeSQLFile = async (filePath) => {
    const sql = fs.readFileSync(filePath, 'utf-8');
    const [results] = await sequelize.query(sql);
    return results;
};

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/query1', async (req, res) => {
    try {
        const results = await executeSQLFile(path.join(__dirname, 'src/queries/query1.sql'));
        res.render('query1', { results });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server Error');
    }
});

app.get('/query2', async (req, res) => {
    try {
        const results = await executeSQLFile(path.join(__dirname, 'src/queries/query2.sql'));
        res.render('query2', { results });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server Error');
    }
});

app.get('/query3', async (req, res) => {
    try {
        const results = await executeSQLFile(path.join(__dirname, 'src/queries/query3.sql'));
        res.render('query3', { results });
        console.log(results,'SELECT * FROM Movie WHERE year = 2000');
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server Error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

