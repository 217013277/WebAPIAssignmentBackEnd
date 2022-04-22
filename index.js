const Koa = require('koa')
const cors = require('@koa/cors')
const users = require('./routes/users.js')

const app = new Koa()
let port = process.env.Port || 10888
app.listen(port, () => {
  console.log(`Server start in port: ${port}`)
})

const options = {
  origins: '*'
}
app.use(cors(options))

app.use(users.routes())
