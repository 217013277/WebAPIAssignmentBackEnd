const db = require('../helper/postgresDB.js')

/**
  *getUserAll
  *returns json
  */
exports.getUserAll = async () => {
  const query = 'SELECT * FROM users'
  return data = await db.run_query(query)
}

getUserByID = async function getUserByUsername(id) {
  
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