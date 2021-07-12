const jwt = require('jsonwebtoken');
const env = require('../setings/configs/env');

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied');

    try{
        const verified = jwt.verify(token, env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.json({message: 'Invalid Token'});
    }
}