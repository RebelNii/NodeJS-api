require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/mongoDB");
const credentials = require('./middleware/credentials')

const path = require("path");
const LogEvents = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorEvents");

//connect to mongo DB
connectDB()

//custom middleware for logging events
app.use((req, res, next) => {
  console.log(`${req.url}\n${req.method}`);
  LogEvents(`${req.method}\t ${req.headers.origin}\t${req.url}`, "reqs.txt");
  next();
});

// const whiteList = ["http://localhost:3000"];

// const corsOptions = {
//     origin: (origin, callback)=>{
//         if(whiteList.indexOf(origin) != -1 || !origin){
//             callback(null,true)
//         }else{
//             callback(new Error('not allowed by cors'))
//         }
//     },
//     optionsSuccessStatus: 200
// }

//handle access crendentials check before cors
app.use(credentials)

//cross origin resource sharing
app.use(cors(corsOptions));

/**
 * built-in middleware to handle urlenconded data'
 * in other words form data
 * 'Content-Type': application/www-form-urlencoded
 * app.use(express.urlencoded({extended: false}))
 */
app.use(express.urlencoded({ extended: false }));

//another built-in middleware
app.use(express.json());

//cookie middleware
app.use(cookieParser())

//static files
app.use(express.static(path.join(__dirname, "/public")));

//allows subdir to use css
//  app.use('/subdir',express.static(path.join(__dirname,"/public")))

//serve routes
app.use("/", require("./routes/root"));
//  app.use('/subdir', require('./routes/subdir'))
app.use("/user", require("./routes/api/register"));
app.use("/login", require("./routes/api/login"));
//the refresh will receive the cookie that has the refreshToken and will renew if it expires
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));
app.use("/employ", require("./routes/api/employ"));

const port = process.env.PORT || 3050;

//^(must begin..)-$(must end..)--|(or)
app.get("^/$|index", (req, res) => {
  // res.send("hello")
  res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// //(.html)? allows html ext to be optional
// app.get("/hello(.html)?", (req, res) =>{
//     res.sendFile(path.join(__dirname, "views", "newP.html"))
// });

// //redirect
// app.get("/subs.html", (req, res) =>{
//     res.redirect(301, "../views/newP.html")
// });

// app.get("/sub", (req, res) =>{
//     res.sendFile(path.join(__dirname, "views", "./subdir/index.html"))
// });

//Route handlers
// app.get("/handlers", (req,res,next) =>{
//     console.log("handlers");
//     next()
// }, (req,res) =>{
//     res.send("next")
// });

/**
 * Another chained routing method
 * const one = (req,res) => {
 * console.log(one)
 * next()
 * }
 * const two = (req,res) => {
 * console.log(two)
 * next()
 * }
 * const three = (req,res) => {
 * console.log(three)
 * res.send('fin')
 * }
 * app.get('/', [one,two,three])
 */

// app.get("/*", (req, res) =>{
//     res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
// });

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type(txt).send("404 Not Found");
  }
});

app.use(errorHandler);

// app.use(function(err,req,res,next){
//     console.error(err.stack);
//     res.status(500).send(err.message)
// })

//coonect option
mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log(`Server: ${port}`);
  });
})

// app.listen(port, () => {
//   console.log(`Server: ${port}`);
// });
