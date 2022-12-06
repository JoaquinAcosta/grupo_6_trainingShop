const db = require('../database/models')
const {loadProducts, storeProducts} = require ('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports= {

    productsTable: async(req,res) => {
        try{
            let products = await db.Product.findAll({include: ['images']});

            return res.render('productTable',{
                products,
                toThousand
            })
        }catch(error){
            console.error;
        }
    },
    usersTable: (req,res) =>{
        db.User.findAll()
            .then(users => res.render('usersTable',{
                users
            }))
    }
    
}




