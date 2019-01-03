const router = require('express').Router()
const Users = require('./../models/users')
const _ = require('lodash')
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  Users.getAll()
  .then((users) => {
         res.render("index_users", 
    {
        title : "Users manager",
        h1 : "Users manager",
        users : users
    })
})

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.get('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Users.findOne(req.params.id)
  .then((user) => 
  res.format({
    html: () => {   // For html render
      res.render("get_user", 
      {
        title : "Users",
        id : user['id'],
        firstname : user['firstname'], 
        lastname : user['lastname'],
        email: user['email'],
        username: user['username'],
        password: user['password'],
        created_at: user['created_at'],
        updated_at: user['updated_at']
      })
      console.log(' User -> get/:id');
    },
    json: () => {  // For Postman 
      res.json(user)
    }
  }))
  .catch((err) => {
    return res.status(404).send(err)
  })
})


router.get('/:id/todos', (req, res) => {
  Users.findOne(req.params.id)
  .then((users) => {
      Users.getTodos(req.params.id)
      .then((todos) => {
            res.render("user_todos", 
            {
            h1 : 'Todos for the user : ' + req.params.id,
            title: 'Todos for the user : ' + req.params.id,
            users : users,
            todos : todos
            })
      })
    })

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.post('/', (req, res) => {

  Users.create([req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.email])
  .then((user) => 
  res.render("add_users", 
  {
      title : "Florent",
      id : user['id'],
      firstname : user['firstname'], // On récupère le nom et l'avancée de la tâche
      lastname : user['lastname'],
      email: user['email'],
      username: user['username'],
      password: user['password'],
      created_at: user['created_at'],
      updated_at: user['updated_at']
  }))
  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.put('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  req.body.updated_at = new Date().toISOString().  // Update time

  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '')     // delete the dot and everything after  
  req.body.id = req.params.id // Add id to body
  Users.update(req.body)
  .then((user) => 
  res.format({
    html: () => {   // For html render
      res.render("put_user", 
      {
        title : "Florent",
        id : user['id'],
        firstname : user['firstname'], // On récupère le nom et l'avancée de la tâche
        lastname : user['lastname'],
        email: user['email'],
        username: user['username'],
        password: user['password'],
        created_at: user['created_at'],
        updated_at: user['updated_at']
      })
      console.log(' User -> put/:id');
    },
    json: () => {  // For Postman 
      res.json("User updated with success ! ")
    }
  }))
  
  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.delete('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Users.delete(req.params.id)
  .then(() => 
  res.format({
    html: () => {   // For html render
      res.render("delete_user", 
      {
          title : "Florent"
      })
      console.log(' User -> delete/:id');
    },
    json: () => {  // For Postman 
      res.json("User deleted with success ! ")
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})

module.exports = router