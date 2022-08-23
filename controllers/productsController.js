const { loadProducts, storeProducts } = require('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



module.exports = {
    detail: (req, res) => {
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        return res.render('detalledelproducto', {
            product,
            toThousand
        })

    },
    add: (req, res) => {
        return res.render ('addProduct')
    },
    edit : (req, res) => {
    return res.render ('editProduct')
    }
 } 