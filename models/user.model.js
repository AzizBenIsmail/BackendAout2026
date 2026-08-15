const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true , minlength: 6 , maxlength: 20},
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

module.exports = User;