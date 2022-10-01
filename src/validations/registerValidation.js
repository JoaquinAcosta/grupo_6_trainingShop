const { body } = require('express-validator');
const users = require('../data/db').loadUsers();



module.exports = [
    body('name')
        .notEmpty().withMessage('Debe ingresar un nombre').bail()
        .isAlpha('es-ES').withMessage('Solo se permite ingresar letras'),
    body('lastName')
        .notEmpty().withMessage('Debe ingresar un apellido').bail()
        .isAlpha('es-ES').withMessage('Solo se permite ingresar letras'),
    body('email').notEmpty().withMessage('Debe ingresar un email').bail()
        .isEmail().withMessage('Debe colocar un email validó')
        .custom((value, { req }) => {
        let user = users.find(user => user.email === value.trim());
        return !!!user;
        }).withMessage('El email ya se encuentra registrado'),
    body('password').notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isLength({ min: 6, max: 12 }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
    body('password2').notEmpty().withMessage('Vuelva a introducir la contraseña').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                return false
            } else {
                return true
            }
        }).withMessage('Las contraseñas no coinciden'),
]