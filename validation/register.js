const Validator = require('validator');
const isEmpty = require('../utils/index');

module.exports = function validateRegistration(data) {
    let errors = {};
    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.password2 = isEmpty(data.password2) ? '' : data.password2;

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is requried';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is requried';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 32 })) {
        errors.password = 'Password must be between 6 to 32 characters';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}