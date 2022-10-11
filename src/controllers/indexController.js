const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models")
const { Op } = require("sequelize");

module.exports = {
    index : function(req, res,) {
      
      let novedades = db.Product.findAll({
        where: {
          sectionId: 2,
          
        },
        include: ['images']
      })
      let destacados = db.Product.findAll({
        where: {
          sectionId: 1,
          
        },
        include: ['images']
      })
       Promise.all([novedades, destacados])
       .then(([novedades, destacados]) => {
        return res.render("index" , {
          novedades, destacados, toThousand
        })
      }) .catch(error => console.log(error)) 

 },
      search: async(req, res) => { 
    
    try {
      const result = await db.Product.findAll({
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
