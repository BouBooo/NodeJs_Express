const router = require('express').Router()
const Todos = require('./../models/todos')
const _ = require('lodash')

router.get('/', (req, res) => {
  Todos.getAll()
  .then((todos) => {
     res.json(todos)
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
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Todos.findOne(req.params.id)
  .then((todo) => 
    res.render("get", 
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

router.post('/', (req, res) => {
  if (!req.body || (req.body && (!req.body.name || !req.body.completion))) 
  return res.status(404).send('NOT FOUND')

  Todos.create(req.body)
  .then((todo) => /*res.json(todo))*/
    res.render("add", 
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

router.put('/edit/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  req.body.updated_at = new Date() // Update time
  req.body.id = req.params.id // Add id to body
  Todos.update(req.body)
  .then((todo) => 
  res.render("put", 
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
  Todos.delete(req.params.id)
  .then(() => 
  res.render("delete", 
  {
      title : "Florent"
  }))


  /*res.json({ message: 'Todo supprimée avec succès' }))*/
  .catch((err) => {
    return res.status(404).send(err)
  })
})

module.exports = router