const { body } = require('express-validator');
const users = require('../data/db').loadUsers();

module.exports = [
    body('name')
        .notEmpty().withMessage('Debe ingresar un nombre').bail()
        .isAlpha('es-ES').withMessage('Solo se permite ingresar letras'),
     body('email').notEmpty().withMessage('Debe ingresar un email').bail()
        .isEmail().withMessage('Debe colocar un email validó'),
        
    body('password').notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener como mínimo 6 caractéres'),
]