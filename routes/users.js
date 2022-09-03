var express = require('express');
var router = express.Router();

const {register,login, processLogin, processRegister,profile, profileUpdate,logout}=require('../controllers/usersController')

const loginValidation = require('../validations/loginValidation')
const registerValidation=require('../validations/registerValidation')

const userSessionCheck = require('../middlewares/userSessionCheck')


router
   .get('/register', register )

   .post('/register', registerValidation , processRegister)

   .get('/login', login)

   .post('/login', loginValidation, processLogin)


   .get('/logout', logout)

   .get('/profile',profile)

   .put('/update/:id',profileUpdate)


module.exports = router;
