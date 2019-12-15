const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/user');

/**
 * @route GET user/test
 * @desc test user routes
 * @access Private
 */
router.get('/test', (req, res) => res.json({ msg: 'user works' }))

/**
 * @route POST user/register
 * @desc register new user
 * @access Public
 */
router.post('/register', userController.register)

/**
 * @route POST user/login
 * @desc login user and return token
 * @access Public
 */
router.post('/login', userController.login)

/**
 * @route GET user/current
 * @desc return user whoever token belongs to
 * @access Private
 */
router.get('/current', passport.authenticate('jwt', { session: false }), userController.current)

module.exports = router;