const router = require('express').Router();

/**
 * @route GET user/test
 * @desc test profile routes
 * @access Private
 */
router.get('/test', (req, res) => res.json({ msg: 'Profile works' }))

module.exports = router;