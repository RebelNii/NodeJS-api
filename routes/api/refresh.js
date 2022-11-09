const express = require('express')
const router = express.Router()
const path = require('path')
const refresh = require('../../controllers/refreshTokenController')

router.route('/')
    .get(refresh.handleRefreshToken)


module.exports = router