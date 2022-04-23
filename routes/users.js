const Router = require('koa-router')
const model = require('../models/users.js')

const router = Router({prefix: '/api/v1/users'})

const getUserAll = async (ctx) => {
  let result = await model.getUserAll()
  if(result.length) {
    ctx.body = result
  }
}

const getUserByUsername = async (ctx) => {
  let username = ctx.params.username
  let result = await model.getUserByUsername(username)
  if(result.length) {
    ctx.body= result
  }
}

router.get('/', getUserAll)
router.get('/:username', getUserByUsername)

module.exports = router