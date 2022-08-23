const {loadProducts, storeProducts}= require('../data/productsModule')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    detail : (req, res) => {
        return res.render ('detalledelproducto')
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
 } 