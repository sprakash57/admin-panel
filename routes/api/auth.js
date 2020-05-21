const router = require('express').Router();
const auth = require('../../middleware/auth');
const { getAuthUser, login } = require('../../controllers/auth');
const { loginValidation } = require('../../middleware/validation');

/**
 * @swagger
 * /api/auth:
 *   get:
 *     tags:
 *       - auth
 *     summary: Get current authenticated user
 *     description: Get current authenticated user
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Authenticated user
 */
router.get('/', auth, getAuthUser);

/**
 * @swagger
 * /api/auth:
 *   post:
 *     tags:
 *       - login
 *     summary: Login
 *     description: Let authenticated user login to the portal
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "logged in user"
 *         required: true
 *     responses:
 *       200:
 *         description: Authenticated user
 *       401:
 *         description: Invalid credentials
 */
router.post('/', loginValidation, login)

module.exports = router;