const express = require('express')
const app = express()
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const port = 3001

const serve = (path, cache) => express.static(resolve(path), { maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0 })

// 静态化
app.use('/', serve('./dist', true))

const server = app.listen(port, () => {
    console.log('server init port:' + port)
})
