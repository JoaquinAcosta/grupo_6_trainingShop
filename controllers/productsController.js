const {loadProducts,storeProducts} = require('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    detail : (req, res) => {
        return res.render ('detalledelproducto')
    },
    add: (req, res) => {
        return res.render ('addProduct')
    },
    edit : (req, res) => {
    return res.render ('editProduct')
    },
    index: (req,res) => {
        
        const products = loadProducts();
        return res.render('products',{
            products,
            toThousand
        });
    }
 } 