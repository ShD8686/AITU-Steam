const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, default: "New User" }, // Никнейм
    avatar: { type: String, default: "https://i.pravatar.cc/150" }, // Аватарка
    role: { type: String, default: 'user' },
    isApproved: { type: Boolean, default: false },
    balance: { type: Number, default: 0 }, // Виртуальный кошелек
    // Измененная библиотека: храним ID игры и часы
    library: [{
        game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
        hoursPlayed: { type: Number, default: 0 }
    }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);