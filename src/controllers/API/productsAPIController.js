const { unlinkSync } = require("fs");
const path = require("path");
const { literal, Op } = require("sequelize");
const db = require("../database/models");
const { literalQueryUrlImage } = require("../helpers/literalQueryUrlImage");
const { sendJsonError } = require("../helpers/sendJsonError");

module.exports = {
  
    // API -> DETAIL PRODUCT
    detail: async (req, res) => {
      /* OPTIONS DEFAULT */
      let options = {
        include: [
          {
            association: "images",
            attributes: {
              include: [literalQueryUrlImage(req, "file", "file")],
              exclude: ["createdAt", "updatedAt", "deletedAt", "productId"],
              /*  [
                  literal(
                    `CONCAT( '${req.protocol}://${req.get(
                      "host"
                    )}/products/image/',images.file )`
                  ),
                  "file",
                ], */
            },
          },
          {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["updatedAt", "deletedAt", "createdAt"],
        },
      };
  
      try {
        const idProduct = req.params.id;
  
        if (isNaN(idProduct)) {
          return sendJsonError("El parámetro es invalido", res);
        }
  
        const product = await db.Product.findByPk(idProduct, options);
  
        if (!product) {
          return sendJsonError("El producto solicitado no existe", res, 404);
        }
  
        return res.status(200).json({
          ok: true,
          status: 200,
          data: product,
        });
      } catch (error) {
        sendJsonError(error, res);
      }
    },
  
  };