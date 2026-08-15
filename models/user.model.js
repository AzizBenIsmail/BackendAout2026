const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    //user
    phone: Number,
    address: String,

    //admin
    experience: Number,
    specialization: String

}, { timestamps: true });

const User = mongoose.model('User', userSchema);