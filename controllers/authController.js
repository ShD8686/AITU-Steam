const User = require('../models/User');
const Game = require('../models/Game');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        let assignedRole = email.toLowerCase().includes('admin') ? 'admin' : 'user';
        let approvedStatus = assignedRole === 'user';
        const user = new User({ email, password, role: assignedRole, isApproved: approvedStatus });
        await user.save();
        res.status(201).json({ message: assignedRole === 'admin' ? "Admin pending approval!" : "Registered!" });
    } catch (err) { res.status(400).json({ error: "Email already exists" }); }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).json({ error: "Wrong credentials" });
        if (!user.isApproved) return res.status(403).json({ error: "Not approved" });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, role: user.role });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart').populate('library.game');
        res.json(user);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addFunds = async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.id);
        user.balance += Number(amount);
        await user.save();
        res.json({ message: `Success! Added $${amount}` });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.cart.includes(req.body.gameId)) {
            user.cart.push(req.body.gameId);
            await user.save();
        }
        res.json({ message: "Added to cart" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.purchaseGame = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const game = await Game.findById(req.body.gameId);
        if (user.balance < game.price) return res.status(400).json({ error: "No money" });
        if (user.library.some(i => i.game?.toString() === req.body.gameId)) return res.status(400).json({ error: "Owned" });
        
        user.balance -= game.price;
        user.library.push({ game: game._id, hoursPlayed: 0 });
        user.cart = user.cart.filter(id => id.toString() !== req.body.gameId);
        await user.save();
        res.json({ message: "Purchased!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getLibrary = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('library.game');
        res.json(user.library);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.playGame = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const item = user.library.find(i => i.game?.toString() === req.body.gameId);
        if (item) { item.hoursPlayed += 2; await user.save(); }
        res.json({ message: "Played" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};