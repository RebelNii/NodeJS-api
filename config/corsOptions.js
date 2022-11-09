const allow = require('./allowedOrigins');

// const whiteList = ["http://localhost:3000"];

const corsOptions = {
    origin: (origin, callback)=>{
        if(allow.indexOf(origin) != -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('not allowed by cors'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions