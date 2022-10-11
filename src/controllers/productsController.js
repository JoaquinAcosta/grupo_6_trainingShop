const db = require('../database/models');
const { decodeBase64 } = require('bcryptjs');
const { promiseImpl } = require('ejs');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {

     list: (req, res) => {
        db.Product.findAll()
            .then(Products => {
                res.render('addProduct', { products })
            });

    }, 
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
 
    index: (req,res) => {
        db.Product.findAll({
            include : ['images']
        })
            .then(products => {
                res.render('products', { products, toThousand })
            })
            .catch(error => console.log(error))
        
    },
    edit: (req, res) => {
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
