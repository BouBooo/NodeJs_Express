const db = require('sqlite')
const _ = require('lodash')

module.exports = {
  getTodos(user_id) {
    return db.all("SELECT rowid AS id, * FROM todos WHERE user_id = ?", user_id)
  },
  getAll() {
    return db.all("SELECT rowid AS id, * FROM users")
  },
  findOne(id) {
    return db.get("SELECT rowid AS id, * FROM users WHERE rowid = ?", id)
  },
  async create(params) {

    params.created_at = new Date().toISOString(). 

    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '')     // delete the dot and everything after  

    params.updated_at = new Date().toISOString(). 

    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '')     // delete the dot and everything after  

    const data = _.values(params)

    const { lastID } = await db.run("INSERT INTO users VALUES(?,?,?,?,?,?,?)", data)

    return this.findOne(lastID)
  },
  delete(id) {
    return db.run("DELETE FROM users WHERE rowid = ?", id)
  },
  async update(params) {
    let string = ''

    for (k in params) {
      if (k !== 'id') {
        string += k + ' = ?,'
      }
    }

    string = string.substring(0, string.length - 1); // Remove last comma

    const data = _.values(params)
    const { changes } = await db.run("UPDATE users SET " + string + " WHERE rowid = ?", data)
    
    if (changes !== 0) {
      return this.findOne(params.id)
    } else {
      return Promise.reject({ message: 'Could not find id' })
    }
  },
}


