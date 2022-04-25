const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const model = require('../models/users.js')
const auth = require('../controllers/auth.js')
const can = require('../permissions/users.js')

const router = Router({prefix: '/api/v1/users'})

const getUserAll = async (ctx) => {
  const permission = can.readUserAll(ctx.state.user)
  if(!permission.granted) {
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
  const permission = can.readUser(ctx.state.user, parseInt(id))
  if(!permission.granted) {
    ctx.status = 403
  } else {
    let result = await model.getUserByID(id)
    if(result.length) {
      ctx.body = result
    }
  }
}

const createUser = async (ctx) => {
  let body = ctx.request.body
  let result = await model.createUser(body)
  if(result.length) {
    ctx.body = result
  }
}

const updateUser = async (ctx) => {
  let id = ctx.params.id
  permission = can.updateUser(ctx.state.user, parseInt(id))
  if (!permission.granted) {
    ctx.status = 403
  } else {
    let body = ctx.request.body
    let result = await model.updateUser(id, body)
    if(result.length) {
      ctx.body = result
    }
  }
}

router.get('/', auth, getUserAll)
router.get('/:id([0-9]{1,})', auth, getUserByID)
router.post('/', bodyParser(), createUser)
router.post('/:id([0-9]{1,})', bodyParser(), auth, updateUser)

module.exports = router