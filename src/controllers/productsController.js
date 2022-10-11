const db = require('../database/models');
const { decodeBase64 } = require('bcryptjs');
const { promiseImpl } = require('ejs');
const { loadProducts, storeProducts } = require('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// require db.models



module.exports = {
   /*  detail: (req, res) => {
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        return res.render('detalledelproducto', {
            product,
            toThousand
        })
    }, */
    detail: (req, res) => {
		db.Product.findByPk(req.params.id, {
            include : ['images']
        })
			.then(product => res.render('detalledelproducto', {
				product,
				toThousand
			}))
			.catch(error => console.log(error))
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
		/* const products= loadProducts()
		const product = products.find(product => product.id === +req.params.id)
		return res.render('editProduct',{product}) */
        let categories = db.Category.findAll({
            attributes : ['id','name'],
            order : ['name']
        });
        let sections = db.Section.findAll({
            attributes : ['id','name'],
            order : ['name']
        });
        let brands = db.Brand.findAll({
            attributes : ['id','name'],
            order : ['name']
        });
        
        let product = db.Product.findByPk(req.params.id);

        Promise.all([categories,product,sections,brands])
            .then(([categories,product,sections,brands]) => {
                return res.render('editProduct', {
                    product,
                    categories,
                    sections,
                    brands
                })
            })
            .catch (error => console.log(error))
	},
	update: (req, res) => {
		/* const products= loadProducts()
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
		return res.redirect('/admin') */
        db.Product.update(
        {
            ...req.body,
            name : req.body.name.trim(),
            description : req.body.description.trim()

        },
        {
            where : {
                id : req.params.id
            }
        }
    )
        .then( () => res.redirect('/admin'))
        .catch((error) => console.log(error))
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