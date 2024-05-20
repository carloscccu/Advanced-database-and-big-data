const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    movieId: { type: Number, ref: 'Movie', required: true },
    actorId: { type: Number, ref: 'Artist', required: true },
    roleName: { type: String, required: true }
});

module.exports = mongoose.model('Role', RoleSchema);
