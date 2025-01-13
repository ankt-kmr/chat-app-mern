const jwt = require('jsonwebtoken');

const CookieJWTAuth = (req, res, next) => {
    const token = req.cookie.token;
    try{
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch(err){
        return res.clearCookie("token");
    }
}