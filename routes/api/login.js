const express = require('express')
const router = express.Router()
const path = require('path')
const login = require('../../controllers/authController')

router.route('/')
    .post(login.handleLogin)


module.exports = router