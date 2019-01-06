# NodeJs_Express

## Langage utilisé : Node JS

## Modules : 
  - bcrypt
  - dateformat
  - express
  - hbs
  - method_override
  - lodash
  - sqlite


## Style : Feuilles de style Bootstrap 


Les tables suivantes sont celles à implémentées :
  todos: 
    message, completion, updatedAt, createdAt, userId
  users:
    firstname, lastname, username, password, email, createdAt, updatedAt

Pour le mot de passe de l'utilisateur vous utiliserez bcrypt sur npm.

Pour la majorité de ces routes vous utiliserez le multi-format: res.format().
En format JSON vous utiliserez: res.json().

Pour verifier le bon fonctionnement de vos routes en JSON sur Postman pensez à bien mettre les headers suivant: 
  - Content-Type: application/json
  - Accept: application/json

Un crud doit être implémenté pour chacunes de ces ressources: 
  - GET /ressources: 
    - JSON: Renvoi le contenus de la requêtes sql
    - HTML: affiche la page index.tpl
  - GET /ressources/:id
    - JSON: Renvoi le contenus de la requêtes sql
    - HTML: affiche la page show.tpl
  - POST /ressources
    - JSON: {message : 'sucess'}
    - HTML: redirect sur index.tpl
  - PUT/PATCH /ressources/:id
    - JSON: {message : 'sucess'}
    - HTML: redirect sur index.tpl
  - DELETE /ressources/:id
    - JSON: {message : 'sucess'}
    - HTML: redirect sur index.tpl
  - GET /ressources/add
    - HTML: afficher un formulaire
  - GET /ressources/:id/edit
    - HTML: afficher le même formulaire que pour /add
  - GET /users/:id/todos
    - JSON: renvoi les todos de l'utilisateur
    - HTML: affiche un tableau des todos de l'utilisateur


Un middleware de 404 sera necessaire pour toutes les requêtes qui n'arrive pas à destination: 
 - JSON: {status: 404 not found}
 - HTML: une page de 404 




