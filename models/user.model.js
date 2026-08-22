const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true , minlength: 6 , maxlength: 20},
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    age: Number,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    //user
    phone: String,
    address: String,

    //admin
    experience: Number,
    specialization: String,


    car : { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },  //One

    cars : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],  //Many
    
    products : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]  //Many

    


}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;