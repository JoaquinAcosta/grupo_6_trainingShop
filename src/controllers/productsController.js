const db = require('../database/models')
const { loadProducts, storeProducts } = require('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


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
        return res.render ('addProduct')
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
 } 