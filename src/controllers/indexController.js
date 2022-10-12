const { loadProducts, storeProducts } = require("../data/productsModule");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {Product} = require('../database/models');
/* const db = require(__basedir + "/database/models"); */
const { Op } = require("sequelize");

module.exports = {
  index: async (req, res) => {
    const products = loadProducts();
    const novedades = products.filter(
      (product) => product.section === "novedades"
    );
    const destacados = products.filter(
      (product) => product.section === "destacados"
    );

    return res.render("index", {
      title: "Home",
      novedades,
      destacados,
      toThousand,
    }); 
  },
  search: async (req, res) => {
    
    try {
      const result = await Product.findAll({
        where: {
          name: {
            [Op.like]: "%" + req.query.keywords + "%",
          },
        },
        include: ['images']
      });
      return res.render("results", {
        products: result,
        keywords: req.query.keywords,
        toThousand,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
