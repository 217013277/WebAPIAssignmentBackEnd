const Koa = require('koa')

const app = new Koa()
let port = process.env.Port || 10888
app.listen(port, () => {
  console.log(`Server start in port: ${port}`)
})

