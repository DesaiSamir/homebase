const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))

module.exports = {
  createUser ({ firstname, lastname, password, username }) {
    console.log(`Add user: ${firstname} ${lastname} with username: ${username} and password: ${password}`)
    const { salt, hash } = saltHashPassword({ password })
    return knex('user').insert({
      salt,
      encrypted_password: hash,
      username,
      firstname,
      lastname
    })
  },
  authenticate ({ username, password }) {
    // console.log(`Authenticating user ${username}`)
    return knex('user').where({ username })
      .then(([user]) => {
        if (!user) return { success: false }
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        })
        // console.log("hash: '" + hash + "' user: '" + user.encrypted_password + "'");
        return { success: hash === user.encrypted_password }
      })
  },
  createCategory ({ category }) {
    console.log(`Add category: ${category}`)
    return knex('category').insert({
      category
    })
  },
  getCategory (){
    var category = knex('category').select('categoryid','category')
    return category
  }
}

function saltHashPassword ({
  password,
  salt = randomString()
}) {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString () {
  return crypto.randomBytes(4).toString('hex')
}