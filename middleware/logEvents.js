const {format} = require("date-fns");

const {v4: uuid} = require("uuid")

const fs = require("fs")

const fss = require("fs").promises

const path = require("path")

const LogEvents = async (message,fileName) => {
    const dt = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logT = `${dt}\t${uuid()}\t${message}`;
    // console.log(logT)
    try{
        const dir = "./logs"
        if(fs.existsSync(dir)){
            await fss.appendFile(path.join(__dirname,"..", "logs", fileName), `\n${logT}`)
        }else{
            fs.mkdir(dir, (err) =>{
                if(err) throw err;
                // console.log(`${dir} created`)
            });
            // await fss.mkdir(path(__dirname, "logs"))
            if(fs.existsSync(dir)){
                await fss.appendFile(path.join(__dirname,"..", "logs", fileName), `\n${logT}`)
            }
        }
    }catch(err){
        // console.log(err)
    }
}
// const LogEvents = async (message) => {
//     const dt = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
//     const logT = `${dt}\t${uuid()}\t${message}`;
//     console.log(logT)
//     try{
//         const dir = "./logs"
//         if(fs.existsSync(dir)){
//             await fss.appendFile(path.join(__dirname, "logs", "log-one.txt"), logT)
//         }else{
//             fs.mkdir(dir, (err) =>{
//                 if(err) throw err;
//                 console.log(`${dir} created`)
//             });
//             // await fss.mkdir(path(__dirname, "logs"))
//             if(fs.existsSync(dir)){
//                 await fss.appendFile(path.join(__dirname, "logs", "log-one.txt"), `\n${logT}`)
//             }
//         }
//     }catch(err){
//         console.log(err)
//     }
// }

// console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"))

// console.log("Yo")
// console.log(uuid())

module.exports = LogEvents