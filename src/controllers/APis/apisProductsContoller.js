const path = require("path");
const { literal, Op } = require("sequelize");
const db = require("../../database/models");
const { literalQueryUrlImage } = require("../../helpers/literalQueryUrlImage");
const { sendJsonError } = require("../../helpers/sendJsonError");

const controller = {
  image: (req, res) => {
    res.sendFile(
      path.join(__dirname, `../../public/images/products/${req.params.img}`)
    );
  },
  all: async (req, res) => {
    try {
      let {
        page = 1,
        limit = 10,
        offset = 0,
        sales = 0,
        salesDiscount = 5,
        price = 0,
        order = "ASC",
        sortBy = "name",
        search = "",
      } = req.query;

      const typesSort = ["name", "price", "discount", "category", "newest"];
      /* Comprobaciones */
      limit = +limit > 5 ? 5 : +limit;
      salesDiscount = +salesDiscount < 5 ? 5 : +salesDiscount;
      sortBy = typesSort.includes(sortBy) ? sortBy : "name";
      page = +page <= 0 || isNaN(page) ? 1 : +page;

      const queryValuesDefaultAndModify = {
        limit,
        sales,
        salesDiscount,
        price,
        order,
        sortBy,
        search,
      };
      let urlQuery = "";

      for (const key in queryValuesDefaultAndModify) {
        urlQuery += `&${key}=${queryValuesDefaultAndModify[key]}`;
      }

      page -= 1;
      offset = page * limit;
      const orderQuery =
        sortBy === "category"
          ? [["category", "name", order]]
          : sortBy === "newest"
          ? [["createdAt", "DESC"]]
          : [[sortBy, order]];

      let options = {
        limit,
        offset,
        include: [
          {
            association: "images",
            attributes: {
              include: [
                [
                  literal(
                    `CONCAT( '${req.protocol}://${req.get(
                      "host"
                    )}/products/image/', images.file )`
                  ),
                  "file",
                ],
              ],
            },
          },
          /* {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          }, */
        ],
        attributes: {
          exclude: ["updatedAt", "deletedAt"],
        },
        order: orderQuery,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.substring]: search,
              },
            },
            {
              description: {
                [Op.substring]: search,
              },
            },
          ],
        },
      };

      const optionSales = {
        ...options,
        where: {
          discount: {
            [Op.gte]: salesDiscount,
          },
        },
      };
      const optionPrice = {
        ...options,
        where: {
          price: {
            [Op.gte]: price,
          },
        },
      };

      if (+sales === 1 && !isNaN(sales)) {
        options = optionSales;
      }

      if (+price && !isNaN(price)) {
        options = optionPrice;
      }

      const { count, rows: products } = await db.Product.findAndCountAll(
        options
      );

      if (!products.length) {
        return res.status(200).json({
          ok: true,
          status: 204,
          msg: "No hay productos en esta pagina",
        });
      }
      const existPrev = page > 0 && offset <= count;
      const existNext =
        Math.floor(count / limit) >= page + 1 && limit !== count;

      let urlPrev = null;
      let urlNext = null;

      if (existNext) {
        urlNext = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${
          page + 2
        }${urlQuery}`;
      }
      if (existPrev) {
        urlPrev = `${req.protocol}://${req.get("host")}${
          req.baseUrl
        }?page=${page}${urlQuery}`;
      }

      return res.status(200).json({
        meta: {
          ok: true,
          status: 200,
        },
        data: {
          totalProduct: count,
          prev: urlPrev,
          next: urlNext,
          data: products,
        },
      });
    } catch (error) {
      return sendJsonError(error, res);
    }
  },
  detail: async (req, res) => {
    try {
      const idProduct = req.params.id
      let options = {
        include: [
          {
            association: "images",
            attributes: {
              include: [ literalQueryUrlImage(req, "file", "file" )
              ],
              exclude: ['createdAt', 'updatedAt', 'productId']
            },
          },
          /* {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          }, */
        ],
        attributes: {
          exclude: ["updatedAt", "deletedAt", "createdAt"],
        },
      };
      if (isNaN(idProduct)) {
        return sendJsonError("El parametro es invalido", res)
      }
      const product = await db.Product.findByPk(idProduct, options)

      if(!product){
        return sendJsonError("El producto solicitado no existe", res, 404)
      }

      return res.status(200).json({
        ok: true,
        status: 200,
        data: product
      })
      
    } catch (error) {
      return sendJsonError(error, res);
    }
  },
  store: async (req, res) => {

  },
  update: async (req, res) => {

  },
  destroy: async (req, res) => {

  }
};
module.exports = controller;
