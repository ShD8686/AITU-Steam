const mongoose = require('mongoose');
const developerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    foundedYear: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Developer', developerSchema);