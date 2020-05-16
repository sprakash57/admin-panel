const { check } = require('express-validator');

exports.signupValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

exports.loginValidation = [
    check('email', 'Valid email is required').isEmail().exists(),
    check('password', 'Password is required').exists()
]

exports.setErrorMsg = message => ({
    errors: [
        { message }
    ]
});