const jwt = require('jsonwebtoken');
const env = require('../setings/configs/env');

module.exports = function (req, res, next){
    const token = req.cookies['auth-token'];
    if(!token) return res.redirect('/?error=' + encodeURIComponent('Access Denied'));

    try{
        const verified = jwt.verify(token, env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.redirect('/?error=' + encodeURIComponent('Invalid Token'));
    }
}