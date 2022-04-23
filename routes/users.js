const Router = require('koa-router')

const model = require('../models/users.js')
const auth = require('../controllers/auth.js')
const can = require('../permissions/users.js')

const router = Router({prefix: '/api/v1/users'})

const getUserAll = async (ctx) => {
  const permission = can.readUserAll(ctx.state.user)
  if(!permission) {
    ctx.status = 403
  } else {
    let result = await model.getUserAll()
    if(result.length) {
      ctx.body = result
    }
  }
}

const getUserByID = async (ctx) => {
  let id = ctx.params.id
  let result = await model.getUserByID(id)
  if(result.length) {
    ctx.body = result
  }
}

const getUserByUsername = async (ctx) => {
  let username = ctx.params.username
  let result = await model.getUserByUsername(username)
  if(result.length) {
    ctx.body = result
  }
}

router.get('/', auth, getUserAll)
router.get('/:id([0-9]{1,})', getUserByID)
router.get('/username/:username', getUserByUsername)


module.exports = router