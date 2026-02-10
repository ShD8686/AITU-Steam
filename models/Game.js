const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genres: [{ type: String }],
    releaseYear: { type: Number, required: true },
    price: { type: Number, default: 0 },
    description: { type: String },
    developer: { type: mongoose.Schema.Types.ObjectId, ref: 'Developer', required: true }
}, { timestamps: true });


module.exports = mongoose.model('Game', gameSchema);
