const express = require('express')
const router = express.Router();
const path = require('path')


//(.html)? allows html ext to be optional
// router.get("/hello(.html)?", (req, res) =>{
//     res.sendFile(path.join(__dirname,"..", "views", "newP.html"))
// });

// //redirect
// router.get("/subss(.html)?", (req, res) =>{
//     res.redirect(301, "newP.html")
// });

module.exports = router