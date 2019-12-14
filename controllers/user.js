const User = require('../model/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
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