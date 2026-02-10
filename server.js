const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const devRoutes = require('./routes/developerRoutes');
app.use('/developers', devRoutes);

const gameRoutes = require('./routes/gameRoutes');
app.use('/games', gameRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));