// const express = require('express')
// const app = express()

// const mw = function (res, req, next) {
//     console.log('12');
//     next()
// }

// app.use((res, req, next)=> {
//     var time = Date.now()
//     req.time = time
//     next()
// })

// app.get('/',(req,res)=>{
//     res.send('home'+req.time)
// })

// app.get('/user',(req,res)=>{
//     res.send('user'+req.time)
// })


// app.listen(3001,()=>{
//     console.log('3001');
// })

var time = Date.now()%100000

console.log(time);