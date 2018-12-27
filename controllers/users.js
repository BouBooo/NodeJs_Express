const router = require('express').Router()
const Users = require('./../models/users')
const _ = require('lodash')
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  Users.getAll()
  .then((users) => {
     res.json(users)
   /* todos.forEach(todo => {
    });
    res.render("get", 
    {
        title : "Florent",
        name: todo['name'],  // On récupère le nom et l'avancée de la tâche
        completion: todo['completion']
    })*/
    


})

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.get('/:id', (req, res) => {
  /*if (!req.params.id) return res.status(404).send('NOT FOUND')*/
  Users.findOne(req.params.id)
  .then((user) => 
    res.render("get_user", 
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

router.post('/', (req, res) => {

  Users.create([req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.email])
  .then((user) => 
    res.json(user))
  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.put('edit/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  req.body.updated_at = new Date() // Update time
  req.body.id = req.params.id // Add id to body
  Users.update(req.body)
  .then((user) => 
  res.render("put_user", 
  {
      title : "Florent",
      name: todo['name'],  // On récupère le nom et l'avancée de la tâche
      completion: todo['completion'],
      id: todo['id'],
      created_at: todo['created_at'],
      updated_at: todo['updated_at']
  }))
  
  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.delete('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Users.delete(req.params.id)
  .then(() => 
  res.render("delete_user", 
  {
      title : "Florent"
  }))


  /*res.json({ message: 'Todo supprimée avec succès' }))*/
  .catch((err) => {
    return res.status(404).send(err)
  })
})

module.exports = router