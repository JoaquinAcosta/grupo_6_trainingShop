const db = require('../database/models');
const { decodeBase64 } = require('bcryptjs');
const { promiseImpl } = require('ejs');
const { loadProducts, storeProducts } = require('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// require db.models



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
        let categories= db.Category.findAll({
            attributes: ['id','name'],
            order: ['name']
        })
        
        let sections = db.Section.findAll({
            attributes: ['id', 'name'],
            order: ['name']
        }) 

        let brands = db.Brand.findAll({
            attributes: ['id','name'],
            order: ['name']
        })

        Promise.all([categories,sections,brands])
			.then(([categories,sections,brands]) => {
				return res.render('addProduct',{
					categories,
                    sections,
                    brands
				})
			})
			.catch(error => console.log(error));


        
        
    },
    destroy : (req,res) => {

        const {id} = req.params; 
        const products = loadProducts()

        const productsfilter = products.filter( product => product.id !== +id);

        storeProducts(productsfilter);
        return res.redirect('/admin/')

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

        db.Product.create({
			...req.body,
			name : req.body.name,
			description : req.body.description,

		})
        .then(product => {
            
            if(req.files.length){
                let images = req.files.map(({filename}) => {
                    return {
                        file : filename,
                        productId: product.id
                    }
                })
                db.Image.bulkCreate(images,{
                    validate : true
                }).then( (result) => console.log(result) )
                return res.redirect('/products')
            }
            
        })
        .catch(error => console.log(error))

    },
 } 