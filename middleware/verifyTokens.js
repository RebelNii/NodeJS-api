const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGateway = (req,res,next) =>{
    const auth = req.headers.authorization || req.headers.Authorization
    if(!auth?.startsWith('Bearer ')) return res.sendStatus(401)
    // console.log(auth)
    const token = auth.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(err)
            if(err) return res.sendStatus(403)
            req.user = decoded.UserInfo.username,
            req.roles = decoded.UserInfo.roles
            console.log(req.roles)
            next();
        }
    )
}

module.exports = tokenGateway