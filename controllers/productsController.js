const { loadProducts, storeProducts } = require('../data/productsModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


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
        return res.render ('addProduct')
    },
    edit: (req, res) => {
		const products= loadProducts()
		const product = products.find(product => product.id === +req.params.id)
		return res.render('editProduct',{product})
	},
	update: (req, res) => {
		const products= loadProducts()
		const {name, price, category, description, brand} = req.body
		const productsModify = products.map(product => {
			if(product.id === +req.params.id){
				return{...product,
				name: name.trim(),
			    price: +price,
				description: description.trim(),
				brand,
				category
			}
			}
			return product
		})
		storeProducts(productsModify)
		return res.redirect('/products/detail/' + req.params.id)
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
    

 } 