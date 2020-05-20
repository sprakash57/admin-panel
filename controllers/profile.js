const { validationResult } = require('express-validator');
const config = require('config');
const request = require('request');
const User = require('../model/User');
const Profile = require('../model/Profile');
const { setErrorMsg } = require('../utils/index');

exports.fetchMe = async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);
        if (!profile) return res.status(404).json(setErrorMsg('Requested profile not found'));
        res.json(profile);
    } catch (err) {
        res.status(500).json(setErrorMsg(err.message));
    }
}

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

exports.createUpdateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        linkedin,
        stackoverflow
    } = req.body;
    //Build profile object
    const profileFields = {
        user: req.user.id,
        company: company || '',
        website: website || '',
        location: location || '',
        bio: bio || '',
        status: status || '',
        githubusername: githubusername || '',
        skills: skills && skills.split(',').map(s => s.trim()),
        social: {
            youtube: youtube || '',
            facebook: facebook || '',
            twitter: twitter || '',
            linkedin: linkedin || '',
            stackoverflow: stackoverflow || ''
        }
    };

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json({ message: 'Profile updated', profile });
        }
        profile = new Profile(profileFields);
        await profile.save();
        res.json({ message: 'Profile created', profile });
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.fetchAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        if (profiles) return res.json(profiles);
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.fetchOneProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (profile) return res.json(profile);
        return res.status(400).json(setErrorMsg('Requested profile not found'));
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json(setErrorMsg('Requested profile not found'));
        }
        return res.status(500).json(setErrorMsg(error.message));
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        //Remove profile
        await Profile.findOneAndDelete({ user: req.user.id });
        //Remove user
        await User.findOneAndDelete({ _id: req.body.id });
        res.json({ message: 'User and its profile deleted' });
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.addExperience = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    const newExp = {
        title,
        company,
        from,
        location: location || '',
        to: to || '',
        current: current || '',
        description: description || ''
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile.experience.unshift(newExp);
            await profile.save();
            return res.json({ message: 'Experience added', profile });
        }
        return res.status(400).json(setErrorMsg('Profile not found'));
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.deleteExperience = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile.experience = profile.experience.filter(pe => pe._id.toString() !== req.params.exp_id);
            await profile.save();
            return res.json({ message: 'Experience deleted', profile });
        }
        return res.status(400).json(setErrorMsg('Profile not found'));
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.addEducation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to: to || '',
        current: current || '',
        description: description || ''
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile.education.unshift(newEdu);
            await profile.save();
            res.json({ message: "Education added", profile });
        }
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.deleteEducation = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education = profile.education.filter(e => e._id.toString() !== req.params.edu_id);
        await profile.save();
        res.json({ message: "Education deleted", profile });
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.fetchGithubRepos = async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=updated:desc&
            client_id=${config.get('githubClientID')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: { 'user-agent': "node.js" }
        }
        request(options, (error, response, body) => {
            if (error) return res.status(503).json(setErrorMsg('Server not able to fetch'))
            if (response.statusCode !== 200) {
                res.status(404).json(setErrorMsg('No github profile found'));
            }
            res.json(JSON.parse(body));
        })
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}
