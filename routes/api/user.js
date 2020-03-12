const router = require('express').Router();
const userController = require('../../controllers/user');
const { signupValidation } = require('../../validation');
/**
 * @route POST api/users
 * @desc register new user
 * @access Public
 */
router.post('/register', signupValidation, userController.register)

// /**
//  * @route POST user/login
//  * @desc login user and return token
//  * @access Public
//  */
// router.post('/login', userController.login)

// /**
//  * @route GET user/current
//  * @desc return user whoever token belongs to
//  * @access Private
//  */
// router.get('/current', passport.authenticate('jwt', { session: false }), userController.current)

module.exports = router;