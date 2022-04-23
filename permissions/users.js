const AccessControl = require('role-acl')

const ac = new AccessControl()

ac.grant('user').condition({Fn: 'EQUALS', args:{'requester': '$.owner'}}).execute('read').on('user', ['*', '!password', '!passwordSalt'])
ac.grant('user').condition({Fn: 'EQUALS', args:{'requester': '$.owner'}}).execute('update').on('user', ['firstname', 'lastname', 'about', 'password', 'email', 'avatarURL'])

ac.grant('admin').execute('read').on('user')
ac.grant('admin').execute('read').on('users')
ac.grant('admin').execute('create').on('user')
ac.grant('admin').execute('update').on('user')
ac.grant('admin').condition({Fn: 'NOT_EQUALS', args:{'requester': '$.owner'}}).execute('delete').on('user')

exports.readUserAll = (requester) => ac.can(requester.role).execute('read').sync().on('users')

exports.readUser = (requester, data) => ac.can(requester.role).context({requester: requester.ID, owner: data.ID}).execute('read').sync().on('user')

exports.createUser = (requester) => ac.can(requester.role).execute('create').sync().on('user')

//updateUser
//deleteUser