var express = require('express');
var router = express.Router();


const {register,login, processLogin, processRegister,profile, profileUpdate,logout,destroy}=require('../controllers/usersController')

const loginValidation = require('../validations/loginValidation')
const registerValidation=require('../validations/registerValidation')
const profileValidation = require('../validations/profileValidation')

const userSessionCheck = require('../middlewares/userSessionCheck')
const guestSessionCheck = require('../middlewares/guestSessionCheck')
const {uploadImageProfile} = require('../middlewares/uploadImageProfile');

router
   .get('/register',guestSessionCheck, register )

   .post('/register', registerValidation , processRegister)

   .get('/login',guestSessionCheck, login)

   .post('/login', loginValidation, processLogin)

   .get('/logout', logout)

   .get('/profile/', userSessionCheck, profile)

   .put('/update/:id',uploadImageProfile.single('avatar'),profileValidation,profileUpdate)
   
   .delete('/delete/:id',destroy)
   

   


module.exports = router;
