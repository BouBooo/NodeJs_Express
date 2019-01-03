const router = require('express').Router()
const Todos = require('./../models/todos')
const _ = require('lodash')

router.get('/', (req, res) => {
  Todos.getAll()
  .then((todos) => {
         res.render("index", 
    {
        title : "Todos manager",
        h1 : "Todos manager",
        todos : todos
    })
        /*todos.forEach(todo => {
         res.render("index", { todo})
    });*/
})

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.get('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Todos.findOne(req.params.id)
  .then((todo) => 
  res.format({
    html: () => {   // For html render
      res.render("get", 
      {
          title : "Florent",
          name: todo['name'],  // On récupère le nom et l'avancée de la tâche
          completion: todo['completion'],
          id: todo['id'],
          user_id: todo['user_id'],
          created_at: todo['created_at'],
          updated_at: todo['updated_at']
      })
    },
    json: () => {  // For Postman 
      res.json(todo)
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.post('/', (req, res) => {
  if (!req.body || (req.body && (!req.body.name || !req.body.completion || !req.body.user_id))) 
  return res.status(404).send('NOT FOUND')

  Todos.create(req.body)
  .then((todo) => /*res.json(todo))*/
    res.render("add", 
    {
        title : "Florent",
        id : todo['id'],
        name : todo['name'],
        completion : todo['completion']
    }))
  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.put('/edit/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  req.body.updated_at = new Date().toISOString().

  replace(/T/, ' ').      
  replace(/\..+/, '')     
  
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
  res.format({
    html: () => {   // For html render
      res.render("delete", 
      {
          title : "Florent"
      })
    },
    json: () => {  // For Postman 
      res.json("Todo deleted with success ! ")
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})


router.use((err, req, res, next) => {
  res.format({
    html: () => {
      console.log("error : " + err)
      res.render("error404", {
        error: err
      })
    },
    json: () => {
      console.log("error : " + err)
      res.json({
        message: "Error 500",
        description: "Server Error"
      })
    }
  })
})

module.exports = router