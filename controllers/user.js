const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { setErrorMsg } = require('../utils/index');
const config = require('config');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(409).json(setErrorMsg('User already exists'));
        const avatar = gravatar.url({ s: '200', r: 'pg', d: 'mm' });
        const newUser = new User({ name, email, avatar, password });
        //Encrypt password before saving it to DB
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        //Create payload for jwt
        //id and _id both will work here. id is just an abstract layer provided by mongoose
        const payload = {
            user: { id: newUser.id }
        }
        await newUser.save();
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
            if (err) return res.status(500).json(setErrorMsg('Server was not able to generate token'));
            res.status(200).json({ message: 'User registered successfully', token })
        })
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}