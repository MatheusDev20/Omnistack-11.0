const express = require('express');
const routes = express.Router()
const {validaUserInputs} = require('./utils/util')
const {createUser,getUsersList} = require('./controllers.js/user')
const {create,getActionsList,deleteAction,getUserActions} = require('./controllers.js/actions')
const {login} = require('./controllers.js/login')



// Rota para listar todos os users
routes.get('/users', getUsersList)
// Rota criação de novos usuários.
routes.post('/users',createUser)
// Rotas para as ações
routes.post('/actions',create)
routes.get('/actions', getActionsList)
routes.get('/actions/:user_id',getUserActions)
routes.delete('/actions/:id', deleteAction)
// Rota de Login
routes.post('/login', login)




module.exports = routes