const User = require('../model/User');
const Profile = require('../model/Profile');

exports.findUser = (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile exists'
                return res.status(404).json({ msg: 'Profile not found' })
            }
            return res.json(profile);
        })
        .catch(err => res.status(404).json(err));
}