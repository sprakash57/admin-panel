const router = require('express').Router();
const passport = require('passport');
const profileController = require('../controllers/profile');

/**
 * @route GET user/test
 * @desc test profile routes
 * @access Private
 */
router.get('/test', (req, res) => res.json({ msg: 'Profile works' }))

/**
 * @route GET user/profile
 * @desc fetch current user profile details
 * @access Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), profileController.findUser);

module.exports = router;