const joi = require('@hapi/joi')

const username = joi.
string().alphanum().min(1).max(10).required()

const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

//注册和登录的验证规则对象
exports.reg_login_schema = {
    //对req.body中数据进行验证
    body: {
        username,
        password,
    },
}