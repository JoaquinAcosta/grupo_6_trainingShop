const { body } = require("express-validator");
const db = require("../database/models");
const bcryptjs = require("bcryptjs");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("De ser un email válido")

    .custom((value, { req }) => {
      return db.User.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((user) => {
          if (!bcryptjs.compareSync(req.body.password, user.password)) {
            return Promise.reject();
          }
        })
        .catch((error) => {
          return Promise.reject("Credenciales invalidas");
        });
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail(),
];
