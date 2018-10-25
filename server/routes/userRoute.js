const route = require('express').Router()
const UserController = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

route
  .put('/like/:id', isLogin, UserController.like)
  .put('/dislike/:id', isLogin, UserController.dislike)
  .get('/', isLogin, UserController.getUser)
  .post('/login', UserController.Login)
  .post('/register', UserController.Register)

module.exports = route
