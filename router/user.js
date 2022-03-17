const express = require('express')

const router = express.Router()

const expressJoi = require('@escook/express-joi')

const{req_login_schema} = require('../schema/user')

const userHandler = require('../router_handler/user')

router.post('/reguser',expressJoi(req_login_schema), userHandler.regUser)

router.post('/login', userHandler.login)

module.exports = router