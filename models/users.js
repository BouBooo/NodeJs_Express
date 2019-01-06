const db = require('sqlite')
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync("B4c0/\/", salt);

module.exports = {
  /* Get todos for a specific user */
  getTodos(user_id) {
    return db.all("SELECT rowid AS id, * FROM todos WHERE user_id = ?", user_id)
  },
  
  /* Get all users */
  getAll() {
    return db.all("SELECT rowid AS id, * FROM users")
  },

  /* Get a specific user */
  findOne(id) {
    return db.get("SELECT rowid AS id, * FROM users WHERE rowid = ?", id)
  },

  /* Add a user */
  async create(params) {

    /* Improve date format */
    params.created_at = new Date().toISOString(). 
    replace(/T/, ' ').      
    replace(/\..+/, '')     

    params.updated_at = new Date().toISOString(). 

    replace(/T/, ' ').      
    replace(/\..+/, '')      

    const data = _.values(params)

    const { lastID } = await db.run("INSERT INTO users VALUES(?,?,?,?,?,?,?)", data)

    return this.findOne(lastID)
  },

  /* Delete a user */
  delete(id) {
    return db.run("DELETE FROM users WHERE rowid = ?", id)
  },

  /* Edit a user */
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


