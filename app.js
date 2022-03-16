const express = require('express')

const app = express()

const cors = require('cors')
app.use(express.urlencoded({ extended: false }))

const userRouter = require('./router/user')
app.use('/api', userRouter)

app.use(cors())


app.listen(3007, function () {
    console.log('3007');
})