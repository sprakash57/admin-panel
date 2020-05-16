const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../model/User');
const { setErrorMsg } = require('../utils/index');

exports.getAuthUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    try {
        //User exist or not
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json(setErrorMsg('Invalid credentials'));
        //Password matches or not
        const passwdMatch = await bcrypt.compare(password, user.password);
        if (!passwdMatch) return res.status(401).json(setErrorMsg('Invalid credentials'));
        jwt.sign(
            { user: { id: user.id } },
            config.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if (err) return res.status(500).json(setErrorMsg('Token issue from server'))
                res.json({ message: 'Logged in successfully', token });
            }
        )
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}
