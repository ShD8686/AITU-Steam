const Game = require('../models/Game');

exports.getAll = async (req, res) => {
    try {
        let query = {};
        if (req.query.genre) query.genres = req.query.genre;
        if (req.query.search) {
            query.title = { $regex: req.query.search, $options: 'i' };
        }
        const games = await Game.find(query).populate('developer', 'name');
        res.json(games);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('developer');
        if (!game) return res.status(404).json({ error: "Game not found" });
        res.json(game);
    } catch (err) { res.status(400).json({ error: "Invalid ID" }); }
};

exports.create = async (req, res) => {
    try {
        const { title, genres, releaseYear, price, developer, description } = req.body;

        const genresArray = (typeof genres === 'string') 
            ? genres.split(',').map(g => g.trim()).filter(g => g !== "")
            : genres;

        const newGame = new Game({
            title,
            genres: genresArray,
            releaseYear,
            price: Number(price) || 0,
            description: description || "No description provided.",
            developer
        });

        await newGame.save();
        res.status(201).json(newGame);
    } catch (err) { 
        res.status(400).json({ error: err.message }); 
    }
};

exports.delete = async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.json({ message: "Game deleted" });
    } catch (err) { res.status(400).json({ error: err.message }); }

};
