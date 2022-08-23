const {loadProducts} = require('../data/productsModule')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index : function(req, res,) {
        return res.render('index', { 
          title: 'Home' 
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