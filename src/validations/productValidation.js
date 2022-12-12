const { body } = require('express-validator');

module.exports = [
  body("name").notEmpty().withMessage("Debe ingresar un nombre").bail(),
  /* .isAlpha('es-ES').withMessage('Solo se permite ingresar letras') */ body(
    "price"
  )
    .notEmpty()
    .withMessage("Debe ingresar un precio")
    .bail()
    .isNumeric()
    .withMessage("Solo se permite ingresar números")
    .bail(),
  body("description")
    .notEmpty()
    .withMessage("Debe ingresar una descripcion")
    .isLength({min: 20}).withMessage("Longitud mínima 20 caracteres")
    .bail(),
  body("sectionId").custom((value, { req }) => {
    const sectionsId = ["1", "2"];
    if (!sectionsId.includes(value)) {
      throw new Error("Debe ingresar una sección");
    }

    return true;
  }),
  body("brandId").custom((value, { req }) => {
    const brandIdDefault = "0";
    if (brandIdDefault.includes(value)) {
      throw new Error("Debe ingresar una Marca");
    }

    return true;
  }),
  body("categoryId").custom((value, { req }) => {
    const categoryIdDefault = "0";
    if (categoryIdDefault.includes(value)) {
      throw new Error("Debe ingresar una categoria");
    }

    return true;
  }),
  body("image")
    .custom((value, { req }) => {
      if (req.files[0]) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Debes agregar una imagen").bail()
    .custom((value, { req }) => {
      let mimetypeFile = req.files[0].mimetype;
      if (mimetypeFile === 'image/jpeg' || mimetypeFile === 'image/png') {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Formato de imagen inválido")
    ,
];