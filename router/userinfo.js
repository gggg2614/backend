const express = require('express')

const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')

const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema } = require('../schema/user')

//获取用户信息
router.get('/userinfo', userinfo_handler.getUserInfo)
//更新用户信息
router.post('/userInfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

module.exports = router