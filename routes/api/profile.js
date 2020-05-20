const router = require('express').Router();
const { validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { profileValidation, experienceValidation, educateValidation } = require('../../middleware/validation');
const ctrls = require('../../controllers/profile');

/**
 * @route api/profile/me
 * @desc test profile routes
 * @access Private
 */
router.get('/me', auth, ctrls.fetchMe);

/**
 * @route api/profile/
 * @desc Create/Update user profile
 * @access Private
 */
router.post('/', [auth, profileValidation], ctrls.createUpdateProfile);

/**
 * @route api/profile/
 * @desc Fetch all the profiles
 * @access Public
 */
router.get('/', ctrls.fetchAllProfiles);

/**
 * @route api/profile/user/:user_id
 * @desc Fetch one profile
 * @access Public
 */
router.get('/user/:user_id', ctrls.fetchOneProfile);

/**
 * @route api/profile
 * @desc Delete one profile, user and posts
 * @access Private
 */
router.delete('/', auth, ctrls.deleteProfile);

/**
 * @route api/profile/experience
 * @desc Add profile experience
 * @access Private
 */
router.put('/experience', [auth, experienceValidation], ctrls.addExperience);

/**
 * @route api/profile/experience/:exp_id
 * @desc Delete profile experience
 * @access Private
 */
router.delete('/experience/:exp_id', auth, ctrls.deleteExperience);

/**
 * @route api/profile/education
 * @desc Add profile education
 * @access Private
 */
router.put('/education', [auth, educateValidation], ctrls.addEducation);

/**
 * @route api/profile/education/:edu_id
 * @desc Delete profile education
 * @access Private
 */
router.delete('/education/:edu_id', auth, ctrls.deleteEducation);

/**
 * @route api/profile/github/:username
 * @desc Fetch github repos
 * @access Public
 */
router.get('/github/:username', ctrls.fetchGithubRepos);

module.exports = router;