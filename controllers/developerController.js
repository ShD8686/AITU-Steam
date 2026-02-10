const Developer = require('../models/Developer');

exports.getAll = async (req, res) => {
    try {
        const devs = await Developer.find();
        res.json(devs);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const dev = await Developer.findById(req.params.id);
        if (!dev) return res.status(404).json({ error: "Not found" });
        res.json(dev);
    } catch (err) { res.status(400).json({ error: "Invalid ID" }); }
};

exports.create = async (req, res) => {
    try {
        const newDev = new Developer(req.body);
        await newDev.save();
        res.status(201).json(newDev);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const updated = await Developer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Not found" });
        res.json(updated);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.delete = async (req, res) => {
    try {
        await Developer.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) { res.status(400).json({ error: err.message }); }
};