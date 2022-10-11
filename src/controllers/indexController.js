
const {loadProducts, storeProducts} = require ('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models")

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


     /* /*    const products = loadProducts();
        const novedades = products.filter(product => product.section === 'novedades');
        const destacados = products.filter(product => product.section === 'destacados');
        
        return res.render('index', { 
          title: 'Home',
          novedades,
          destacados,
          toThousand  
        }); */
 },
      search: (req, res) => {
        // Do the magic
        
      
        const products = loadProducts()
    
        const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()));
        return res.render('results', {
          products : result,
          keywords: req.query.keywords,
          toThousand 
        })
    
      }
}