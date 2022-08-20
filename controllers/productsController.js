const fs = require('fs');
const path = require('path');

const products = require('../data/productDataBase.json');

module.exports = {
    detail : (req, res) => {
        return res.render ('detalledelproducto')
    },
    add: (req, res) => {
        return res.render ('addProduct')
    },




    edit : (req,res) => {

        const {id} = req.params;
        let product = products.find(product => product.id === +id)

        return res.render('editProduct',{
            product
        })
    },
    update : (req,res) => {

        const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'productDataBase.json')));

        const {id} = req.params;
        let {title, price,discount, description, brand, section} = req.body;


        const productModify = products.map(product => {
            if(product.id === +id){
                return {
                    ...product,
                    title : title.trim(),
                    description : description.trim(),
                    price : +price,
                    discount : +discount,
                    brand,
                    section
                }
            }else{
                return product
            }
        })

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productDataBase.json'),JSON.stringify(productModify,null,3),'utf-8');    
        return res.redirect('/products/detail/' + id);

    },
    /* edit : (req, res) => {
    return res.render ('editProduct')
    } */
 } 