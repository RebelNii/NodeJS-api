const logEvents = require("./logEvents")


const errorHandler = (err,req,res,next) =>{
    console.error(err.stack);
    logEvents(`${req.url}\t${req.method}\t${req.headers.origin}\t${err.name}\t${err.message}`,'errorLogs.txt')
    res.status(500).send(err.message)
}


module.exports = errorHandler