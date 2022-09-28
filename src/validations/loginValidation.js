const {body} = require('express-validator')
const users = require('../data/db').loadUsers();
const bcryptjs = require('bcryptjs');

module.exports = [
    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('De ser un email válido'),
    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .custom((value, {req}) => {
        let user = users.find(user => user.email === req.body.email.trim() && bcryptjs.compareSync(value,user.password));
        return !!user
    }).withMessage('Credenciales inválidas'),
]