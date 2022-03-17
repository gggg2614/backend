const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.regUser = (req, res) => {
    const userinfo = req.body
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({ status: 1, message: '用户名或密码不合法!' })
    // }

    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名已被占用' })
            return res.cc('用户名已被占用')
        }
        if (results.affectedRows !== 1) {
            // return res.send({ status: 1, message: '注册失败' })
            res.cc('注册失败')
        }
        // res.send({ status: 0, message: '注册成功' })
        res.cc('注册成功')
    })
}

exports.login = (req, res) => {
    res.send('login ok')
}