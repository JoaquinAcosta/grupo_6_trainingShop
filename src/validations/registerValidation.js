const { body } = require('express-validator');
const db = require('../database/models')



module.exports = [
    body('name')
        .notEmpty().withMessage('Debe ingresar un nombre').bail()
        .isAlpha('es-ES').withMessage('Solo se permite ingresar letras'),
    body('lastName')
        .notEmpty().withMessage('Debe ingresar un apellido').bail()
        .isAlpha('es-ES').withMessage('Solo se permite ingresar letras'),
<<<<<<< HEAD
    body('email').notEmpty().withMessage('Debe ingresar un email').bail()
        .isEmail().withMessage('Debe colocar un email validó'),
        /* .custom((value, { req }) => {
=======
    /* body('email').notEmpty().withMessage('Debe ingresar un email').bail()
        .isEmail().withMessage('Debe colocar un email validó')
        .custom((value, { req }) => {
            const users = db.User.findOne({ where: { email } }); 
>>>>>>> be6d297186c7f235f62387bdd2b53371a37a9296
        let user = users.find(user => user.email === value.trim());
        return !!!user;
        }).withMessage('El email ya se encuentra registrado'), */
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
        body('email', 'debe ingresar un mail valido').exists().isEmail().trim().escape().custom(userEmail=> {
            return new Promise((resolve, reject) => {
                db.User.findOne({ where: { email: userEmail } })
                .then(emailExist => {
                    if(emailExist !== null){
                        reject(new Error('el email ya existe'))
                    }else{
                        resolve(true)
                    }
                })
                
            })
        }), //extraido
]