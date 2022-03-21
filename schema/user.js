const joi = require('@hapi/joi')

const username = joi.
    string().alphanum().min(1).max(10).required()

const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//注册和登录的验证规则对象
exports.reg_login_schema = {
    //对req.body中数据进行验证
    body: {
        username,
        password,
    },
}

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email,
    }
}

exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}