const express = require('express')

const joi = require('@hapi/joi')

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

app.use(cors())


app.listen(3007, function () {
    console.log('3007');
})