const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./src/models/movie.model');
const User = require('./src/models/internet_user.model');
const Score = require('./src/models/score_movie.model');
const config = require('./src/config/config');

const app = express();

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Query 1: Find all movies of a specific genre
app.get('/query1', async (req, res) => {
  const genre = req.query.genre || 'Action';
  const movies = await Movie.find({ genre });
  console.log(movies, 'SELECT * FROM Movie WHERE genre = Action');
  res.render('query1', { movies });
});

// Query 2: Find all users from a specific region
app.get('/query2', async (req, res) => {
  const region = req.query.region || 'US';
  const users = await User.find({ region });
  res.render('query2', { users });
});

// Query 3: Aggregation query to get average scores of movies
app.get('/query3', async (req, res) => {
  const results = await Score.aggregate([
    {
      $group: {
        _id: "$movieId",
        averageScore: { $avg: "$score" }
      }
    },
    {
      $lookup: {
        from: "movie",
        localField: "_id",
        foreignField: "movieId",
        as: "movie"
      }
    },
    {
      $unwind: "$movie"
    },
    {
      $project: {
        _id: 0,
        title: "$movie.title",
        averageScore: 1
      }
    }
  ]);
  res.render('query3', { results });
});

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
