const router = require('express').Router();
const User = require('../model/User');
const userController = require('../controllers/user');

/**
 * @route GET user/test
 * @desc test user routes
 * @access Private
 */
router.get('/test', (req, res) => res.json({ msg: 'user works' }))

/**
 * @route POST user/register
 * @desc test user routes
 * @access Public
 */
router.post('/register', userController.register)

module.exports = router;