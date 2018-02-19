const express = require('express')
const app = express()
const path = require('path')

const port = 3001

// 文件静态化
app.use('/', express.static(path.join(__dirname, 'dist'))) // 静态呈现页面

const server = app.list(port, () => {
    console.log('server init port:' + port)
})
