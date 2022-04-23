const Router = require('koa-router')
const model = require('../models/users.js')

const router = Router({prefix: '/api/v1/users'})

router.get('/', getUserAll)

async function getUserAll(ctx) {
  let result = await model.getUserAll()
  if(result.length) {
    ctx.body = result
  }
}

module.exports = router