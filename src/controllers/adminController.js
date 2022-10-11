const db = require('../database/models')
const {loadProducts, storeProducts} = require ('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports= {

    index: (req,res)=>{
        /* products = loadProducts();
        res.render('productTable',{
            products,
            toThousand
        }) */
        db.Product.findAll()
            .then(products => res.render('productTable',{
                products,
                toThousand
            }))
    }
}




