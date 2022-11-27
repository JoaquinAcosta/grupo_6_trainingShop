const db = require("../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: ["images"],
    })
      .then((product) => 
        res.render("detalledelproducto", {
          product,
          toThousand,
        })
      )

      .catch((error) => console.log(error));
  },
  add: (req, res) => {
    let categories = db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });

    let sections = db.Section.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });

    let brands = db.Brand.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });

    Promise.all([categories, sections, brands])
      .then(([categories, sections, brands]) => {
        return res.render("addProduct", {
          categories,
          sections,
          brands,
        });
        
      })
      
      .catch((error) => console.log(error));
  },

  index: (req, res) => {
    db.Product.findAll({
      include: ["images"],
    })
      .then((products) => {
        res.render("products", { products, toThousand });
      })
      .catch((error) => console.log(error));
  },
  edit: (req, res) => {
    let categories = db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    let sections = db.Section.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    let brands = db.Brand.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });

    let product = db.Product.findByPk(req.params.id);
    let image = db.Image.findByPk(req.params.id);

    Promise.all([categories, product, sections, brands,image])
      .then(([categories, product, sections, brands,image]) => {
        return res.render("editProduct", {
          product,
          categories,
          sections,
          brands,
          image,
        });
        
      })
      .catch((error) => console.log(error));
  },
  update: (req, res) => {
    db.Product.update(
      {
        ...req.body,
        name: req.body.name.trim(),
        description: req.body.description.trim(),
      },
      {
        where: {
          id: req.params.id,
        },
      },
      
    )
      .then(() => res.redirect("/admin/products"))
      .catch((error) => console.log(error));
  },
  store: async (req, res) => {
    let { brandId, otro } = req.body
    let new_brand;
    try {
      
        if (brandId === '11' && otro) {
            new_brand = await db.Brand.create({name: otro})
            new_brand = new_brand.id
        }

        let new_product = await db.Product.create({
             ...req.body,
             name : req.body.name,
            brandId: new_brand ? new_brand : brandId,
             description : req.body.description,
        })
        let images = req.files.map(({filename}) => {
            return {
                file: filename,
                productId: new_product.id
            }
        });
        let result = await db.Image.bulkCreate(images, { validate: true});
        console.log(result);
        return res.redirect('/admin/products')
    }

    catch (error) {
        console.log(error);
    }
},

    destroy:  async(req, res) =>{
      try{
        await db.Image.destroy({
          where:
          {
           productId: req.params.id
          }
        });

        await db.Product.destroy({
          where : {
            id : req.params.id
          }
        });

        return res.redirect('/admin/products')

      }catch(error){
        console.log(error);
      }
    },
 }


