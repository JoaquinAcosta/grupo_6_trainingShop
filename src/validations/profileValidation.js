const { body } = require('express-validator');

module.exports = [
    body('name')
        .notEmpty().withMessage('Debe ingresar un nombre').bail()
        .isAlpha('es-ES').withMessage('Solo se permite ingresar letras'),
    body('lastName')
        .notEmpty().withMessage('Debe ingresar un apellido').bail()
        .isAlpha('es-ES').withMessage('Solo se permite ingresar letras'),
     body('email').notEmpty().withMessage('Debe ingresar un email').bail()
        .isEmail().withMessage('Debe colocar un email validó'),
     body('phone').notEmpty().withMessage('Debe ingresar un teléfono').bail()
        .isNumeric().withMessage('Solo se permite ingresar números'),
]