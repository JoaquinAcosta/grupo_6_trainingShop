const {body} = require('express-validator')

const bcryptjs = require('bcryptjs');

module.exports = [
    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('De ser un email válido'),
    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
]