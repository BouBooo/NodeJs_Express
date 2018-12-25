const db = require('sqlite')
const express = require('express')
const bodyParser = require('body-parser')
const api = express()
const methodOverride = require('method-override')
/*const bycrypt = require('bycrypt')*/

api.set('views', './views') 
api.set('view engine', 'hbs')

api.use(methodOverride('_method'))

db.open('api.db').then(() => {
  Promise.all([
    db.run("CREATE TABLE IF NOT EXISTS todos (name, completion, created_at, updated_at, user_id)"),
  ]).then(() => {
    console.log('Database todos is ready')
  }).catch((err) => {
    console.log('Une erreur est survenue :', err)
  })
})

db.open('api.db').then(() => {
  Promise.all([
    db.run("CREATE TABLE IF NOT EXISTS users (firstname, lastname, password, email, created_at, updated_at)"),
  ]).then(() => {
    console.log('Database users is ready')
  }).catch((err) => {
    console.log('Une erreur est survenue :', err)
  })
})

// MIDDLEWARE POUR PARSER LE BODY
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
// api.use(methodOverride(‘_method’))

// ROUTES
api.use('/todos', require('./controllers/todos'))
api.use('/users', require('./controllers/users'))

api.listen(3000);

console.log("http://localhost:3000/");