const UserModel = require('../models/user.model');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../config/mailer');

const createVerificationToken = () => crypto.randomBytes(32).toString('hex');

const sendUserVerificationEmail = async (user) => {
    const token = createVerificationToken();
    user.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex');
    user.emailVerificationExpires = Date.now() + 60 * 60 * 1000;
    await user.save();
    await sendVerificationEmail(user.email, token);
};

module.exports.createUser = async (req, res) => {
    try {
        const user = new UserModel({ ...req.body, emailVerified: false });
        await user.save();
        await sendUserVerificationEmail(user);
        res.status(201).json({ message: 'Compte cree. Consultez votre e-mail pour le verifier.', userId: user._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.hello = async (req, res) => {
    res.status(200).json({ message: 'Hello, World!' });
};

module.exports.verifyEmail = async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await UserModel.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationExpires: { $gt: new Date() }
        }).select('+emailVerificationToken +emailVerificationExpires');

        if (!user) return res.status(400).json({ message: 'Lien de verification invalide ou expire' });

        user.emailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Adresse e-mail verifiee avec succes' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.createUserAdmin = async (req, res) => {
    try {
        // Ensure role is admin regardless of request body
        const adminData = Object.assign({}, req.body, { role: 'admin', emailVerified: false });
        const admin = new UserModel(adminData);
        await admin.save();
        await sendUserVerificationEmail(admin);
        res.status(201).json({ message: 'Compte admin cree. Consultez votre e-mail pour le verifier.', userId: admin._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

