const express = require('express')
const router = express.Router()
const path = require('path')
const register = require('../../controllers/registerController')

router.route('/')
    .post(register.newUserHandler)


module.exports = router