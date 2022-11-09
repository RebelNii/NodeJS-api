const User = require('../model/User')

// const fss = require('fs').promises
// const path = require('path')


const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleLogout = async (req,res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(204).json({"message": "No problem"});
    const refreshToken = cookies.jwt

    //is refreshToken in DB
    const findUser = await User.findOne({refreshToken}).exec()
    if(!findUser){
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'none',secure: true,})
        //204 means action successful but backend desnt hv to send data back to frontend
        return res.status(204).json({"message": "No problem"}) 
    }else{
        findUser.refreshToken = '';
        const result = await findUser.save();
        console.log(result)
        res.clearCookie('jwt', {httpOnly: true,sameSite: 'none',secure: true,})
        /**
         * in production we'd add secure: true to make sure only https servers are allowed */ 
        res.sendStatus(204)     
    } 
}


module.exports = {handleLogout}