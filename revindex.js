
// //require func created in log file
// const LogEvents = require("./logEvents");

// //instantiate event core module into const
// const eventEmitter = require("events")//common core module

// //create a class the inherits core event module props
// class MyEventEmitter extends eventEmitter {
// }

// //create new instance on class inheritance
// const emit = new MyEventEmitter()

// //emit an event
// emit.on("myLogs", (msg) => LogEvents(msg));

// //we dnt need the timeout but oh well
// setTimeout(()=>{
//     emit.emit("myLogs", "\n I did it")
// }, 2000)