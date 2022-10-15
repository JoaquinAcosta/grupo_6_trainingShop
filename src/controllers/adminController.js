const db = require('../database/models')
const {loadProducts, storeProducts} = require ('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports= {

    productsTable: (req,res)=>{
        db.Product.findAll()
            .then(products => res.render('productTable',{
                products,
                toThousand
            }))
    },
    usersTable: (req,res) =>{
        db.User.findAll()
            .then(users => res.render('usersTable',{
                users
            }))
    }
    
}




