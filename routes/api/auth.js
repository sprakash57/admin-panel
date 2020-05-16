const router = require('express').Router();
const auth = require('../../middleware/auth');
const { getAuthUser, login } = require('../../controllers/auth');
const { loginValidation } = require('../../utils/index');

/**
 * @param - api/auth
 * @desc - get authenticated user based on id.
 * @access - Public
 */
router.get('/', auth, getAuthUser);

/**
 * @param - api/auth
 * @desc - Authenticate user and get the token
 * @access - Public
 */
router.post('/', loginValidation, login)

module.exports = router;