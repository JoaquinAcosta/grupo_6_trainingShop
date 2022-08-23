
const {loadProducts, storeProducts} = require ('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index : function(req, res,) {
        
        const products = loadProducts();
        const novedades = products.filter(product => product.category === 'novedades');
        const destacados = products.filter(product => product.category === 'destacados');
        return res.render('index', { 
          title: 'Home',
          novedades,
          destacados,
          toThousand 
        });
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