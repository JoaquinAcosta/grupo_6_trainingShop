
const { loadProducts, storeProducts } = require('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db= require("../database/models")


module.exports = {

     list: (req, res) => {
        db.Product.findAll()
            .then(Products => {
                res.render('addProduct', { products })
            });
    }, 
    
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
 
    index: (req,res) => {
        
        const products = loadProducts();
        return res.render('products',{
            products,
            toThousand
        });
    },
    edit: (req, res) => {
		const products= loadProducts()
		const product = products.find(product => product.id === +req.params.id)
		return res.render('editProduct',{product})
	},
	update: (req, res) => {
		const products= loadProducts()
		const {name, price, category, description, brand, section} = req.body
		const productsModify = products.map(product => {
			if(product.id === +req.params.id){
				return{...product,
				name: name.trim(),
			    price: +price,
				description: description.trim(),
				brand,
				category,
                section
			}
			}
			return product
		})
		storeProducts(productsModify)
		return res.redirect('/admin')
	},
    store: (req, res) => {
        
        const {id,name,description,image,category,price,brand, section} = req.body
        const products = loadProducts();

        const newProduct = {
            id : (products[products.length - 1].id + 1),
            name : name.trim(),
            description : description.trim(),
            image : 'default-image.png',
            category,
            price : +price,
            brand,
            section
        }

        const productsModify = [...products, newProduct];

        storeProducts(productsModify);

        return res.redirect('/admin')

    },

    destroy: function (req, res) {
        db.Product.destroy({
			where : {
				id : req.params.id
			}
		})
			.then( () => res.redirect('/admin'))
			.catch( error => console.log(error));
	}
  
};
