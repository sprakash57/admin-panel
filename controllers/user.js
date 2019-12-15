const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const validateRegistration = require('../validation/register');
const validateLogin = require('../validation/login');
const key = process.env.SECRET_JWT_KEY;

exports.register = (req, res) => {
    const { errors, isValid } = validateRegistration(req.body);
    if (!isValid) return res.status(400).json({ errors });
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists!' })
            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', //rating
                d: 'mm' //Default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json({ msg: 'User created!', user }))
                        .catch(err => console.log(err));
                })
            })
        })
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) return res.status(400).json({ errors });
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors)
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    //User matched. singed the token
                    //Create the payload.
                    const payload = { id: user.id, name: user.name, avatar: user.avatar }
                    if (isMatch) {
                        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
                            if (!err) res.json({ success: true, token: `Bearer ${token}` })
                            else throw { msg: 'Token missing' }
                        })
                    }
                    else {
                        errors.password = 'Incorrect password';
                        return res.status(400).json(errors);
                    }
                })
                .catch(err => res.json(err))
        })
}

exports.current = (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
}