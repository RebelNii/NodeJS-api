const mongoose = require('mongoose');
const User = require("../model/User");



const jwt = require('jsonwebtoken');
// require('dotenv').config();


const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({"message": ""});
    // console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    const findUser = await User.findOne({refreshToken}).exec();
    if(!findUser){
        return res.status(403).json({"message": "forbes"}) 
    }else{
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if(err || findUser.username != decoded.username) return res.sendStatus(403);
                const role = Object.values(findUser.roles)
                const accessToken = jwt.sign(
                    { "UserInfo": { "username": decoded.username, "roles": role }},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '30s'}
                );
                res.json({accessToken})
            }
        )
    }       
}


module.exports = {handleRefreshToken}