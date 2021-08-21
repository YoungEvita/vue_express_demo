const express = require('express')

const fileUpload = require('express-fileupload') // 上传
// const fs = require('fs')
const compression = require('compression')
const indexRoute = require('./routes/index')
const port = process.env.PORT || 8095;
const app = express()
// 请求压缩放在最开始
app.use(compression())
// parse application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.use(fileUpload())

// app.use(express.static('./services'))
app.use('/', indexRoute)
module.exports.app = app

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', '3.2.1')
    res.header('Content-type', 'application/json;charset=utf-8')
    next()
})
// 第一个参数端口号！！！
app.listen(port, function () {
    console.log('server listening at http://localhost:%s', port)
})
