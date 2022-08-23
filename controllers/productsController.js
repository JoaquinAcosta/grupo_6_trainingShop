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
    destroy : (req,res) => {

        const {id} = req.params; 
        const products = loadProducts()

        const productsfilter = products.filter( product => products.id !== +id);

        storeProducts(productsfilter);
        return res.redirect('/')

    }
 } 