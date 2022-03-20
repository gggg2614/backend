const express = require('express')

const joi = require('@hapi/joi')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

const expressJWT = require('express-jwt')
const config = require('./config')

const cors = require('cors')
app.use(cors())

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

const userRouter = require('./router/user')
app.use('/api', userRouter)

const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份验证失败')
    res.cc(err)
})

app.listen(3007, function () {
    console.log('3007');
})