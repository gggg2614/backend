const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.regUser = (req, res) => {
    const userinfo = req.body
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({ status: 1, message: '用户名或密码不合法!' })
    // }
    db.query('select *from ev_users where username =?', userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名已被占用' })
            return res.cc('用户名已被占用')
        }

        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            }

            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册失败' })
                res.cc('注册失败')
            }
            // res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功')
        })
    })
}

exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username = ? '
    db.query(sql, userinfo.username, function (err, results) {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc('登录失败')
        }

        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        if (!compareResult) {
            return res.cc('密码错误')
        }
        res.send('ok')
    })
}