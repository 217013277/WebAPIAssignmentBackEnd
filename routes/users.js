const Router = require('koa-router')

const router = Router({prefix: '/api/v1/users'})

router.get('/', async ctx => ctx.body = 'hello')

module.exports = router