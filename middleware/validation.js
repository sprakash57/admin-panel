const { check } = require('express-validator');

exports.signupValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

exports.loginValidation = [
    check('email', 'Valid email is required').isEmail().exists(),
    check('password', 'Password is required').exists()
]

exports.profileValidation = [
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty()
]

exports.experienceValidation = [
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From Date required').notEmpty()
]

exports.educateValidation = [
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check('from', 'From is required').notEmpty()
]

exports.postValidation = [
    check('text', 'Text body is required').notEmpty()
]

exports.commentValidation = [
    check('text', 'Text body is required').notEmpty()
]