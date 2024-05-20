const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    artistId: { type: Number, required: true, unique: true },
    surname: { type: String, required: true },
    name: { type: String, required: true },
    DOB: { type: Date }
});

module.exports = mongoose.model('Artist', ArtistSchema, 'Artist');
