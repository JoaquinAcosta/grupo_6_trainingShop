const { body } = require('express-validator');

module.exports = [
    body('name')
        .notEmpty().withMessage('Debe ingresar un nombre').bail()
        .isAlpha('es-ES').withMessage('Solo se permite ingresar letras'),
    body('price').notEmpty().withMessage('Debe ingresar un precio').bail()
        .isNumeric().withMessage('Solo se permite ingresar números'),
    body('description')
        .notEmpty().withMessage('Debe ingresar una descripcion').bail(),
]