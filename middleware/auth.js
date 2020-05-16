const jwt = require('jsonwebtoken');
const config = require('config');
const { setErrorMsg } = require('../utils/index');

module.exports = (req, res, next) => {
    //set token in header
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json(setErrorMsg('No Token, Acees denied'));
    //Otherwise verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json(setErrorMsg(error.message));
    }
}  