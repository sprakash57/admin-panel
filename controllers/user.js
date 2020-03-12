const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        const avatar = gravatar.url({ s: '200', r: 'pg', d: 'mm' });
        const newUser = new User({ name, email, avatar, password });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        res.send('User registered');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
}