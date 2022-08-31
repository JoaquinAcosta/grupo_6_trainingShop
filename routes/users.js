var express = require('express');
var router = express.Router();

const {register,login, processLogin, processRegister}=require('../controllers/usersController')
const loginValidation = require('../validations/loginValidation')
const registerValidation=require('../validations/registerValidation')




router
   .get('/register', register )

.post('/register', registerValidation , processRegister)

   .get('/login', login)
   .post('/login', loginValidation, processLogin)

module.exports = router;
