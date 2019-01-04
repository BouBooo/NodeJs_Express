const db = require('sqlite')
const _ = require('lodash')

module.exports = {
  /* Get all todos */
  getAll() {
    return db.all("SELECT rowid AS id, * FROM todos")
  },

  /* Get a specific todo */
  findOne(id) {
    return db.get("SELECT rowid AS id, * FROM todos WHERE rowid = ?", id)
  },

  /* Add a todo */
  async create(params) {
    /* Improve date format */
    params.created_at = new Date().toISOString().
  
      replace(/T/, ' ').
      replace(/\..+/, '')    

    params.updated_at = new Date().toISOString().

    replace(/T/, ' ').   
    replace(/\..+/, '')     
    
    const data = _.values(params)

    const { lastID } = await db.run("INSERT INTO todos VALUES(?,?,?,?,?)", data)

    return this.findOne(lastID)
  },

  /* Delete a todo */
  delete(id) {
    return db.run("DELETE FROM todos WHERE rowid = ?", id)
  },

  /* Edit a todo */
  async update(params) {
    let string = ''

    for (k in params) {
      if (k !== 'id') {
        string += k + ' = ?,'
      }
    }

    string = string.substring(0, string.length - 1); // Remove last comma

    const data = _.values(params)
    const { changes } = await db.run("UPDATE todos SET " + string + " WHERE rowid = ?", data)
    
    if (changes !== 0) {
      return this.findOne(params.id)
    } else {
      return Promise.reject({ message: 'Could not find id' })
    }
  },
}