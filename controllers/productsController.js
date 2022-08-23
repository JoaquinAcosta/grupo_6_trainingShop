const { loadProducts,storeProducts } = require("../data/productsModule");

module.exports = {
    detail : (req, res) => {
        return res.render ('detalledelproducto')
    },
    add: (req, res) => {
        return res.render ('addProduct')
    },
    store: (req, res) => {
        
        const {id,name,description,image,category,price,brand} = req.body
        const products = loadProducts();

        const newProduct = {
            id : (products[products.length - 1].id + 1),
            name : name.trim(),
            description : description.trim(),
            image : 'default-image.png',
            category,
            price : +price,
            brand
        }

        const productsModify = [...products, newProduct];

        storeProducts(productsModify);

        return res.redirect('/')

    },
    edit : (req, res) => {
    return res.render ('editProduct')
    }
 } 