const router = require('express').Router();

router.get('/test', (req, res) => res.json({ msg: 'Post works' }))

module.exports = router;