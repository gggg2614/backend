const express = require('express')

const joi = require('@hapi/joi')

const config = require('./config')

const expressJWT = require('express-jwt')

const app = express()

app.use(function (err, req, res, next) {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    res.cc(err)
})

app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

const cors = require('cors')
app.use(express.urlencoded({ extended: false }))

const userRouter = require('./router/user')
app.use('/api', userRouter)

app.use(function (err, req, res, next) {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份验证失败')
    }
    res.cc(err)
})

app.use(cors())

app.use(expressJWT
    ({ secret: config.jwtSecretKey }).
    unless({ path: [/^\/api\//] }))



app.listen(3007, function () {
    console.log('3007');
})