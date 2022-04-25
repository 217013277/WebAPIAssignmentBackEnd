const db = require('../helper/postgresDB.js')

/**
  *getUserAll
  *returns json
  */
exports.getUserAll = async () => {
  const query = 'SELECT * FROM users'
  return data = await db.run_query(query)
}

/**
  *getUserByID
  *@param id
  *returns json
  */
exports.getUserByID = async (id) => {
  const query = 'SELECT * FROM users WHERE id = ?'
  let values = [id]
  return data = await db.run_query(query, values)
}

/**
  *getUserByUsername
  *@param username
  *returns json
  */
exports.getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = ?'
  let values = [username]
  return data = await db.run_query(query, values)
}

/**
  *createUser
  *returns json
  */
exports.createUser = async (userDetails) => {
  console.log(userDetails)
  let keys = Object.keys(userDetails)
  keys = keys.join(',')
  let values = Object.values(userDetails)
  let parm = ''
  for (i = 0; i < values.length; i++) parm += '?,'
  parm = parm.slice(0, -1)
  let query = `INSERT INTO users (${keys}) VALUES (${parm}) RETURNING *`
  return data = await db.run_query(query, values)
}

exports.updateUser = async (id, userDetails) => {
  let userId = [id]
  let keys = Object.keys(userDetails)
  keys = keys.join(' = ?,')
  let values = Object.values(userDetails)
  let query = `UPDATE users SET ${keys} = ? WHERE id = ${userId} RETURNING *`
  return data = await db.run_query(query, values)
}