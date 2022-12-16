const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

const {detail, add, store, edit, update, index, destroy,addBrand, remove } = require ('../controllers/productsController')

const productValidation = require('../validations/productValidation')

const adminUserCheck = require('../middlewares/adminUserCheck');
const {uploadProductImage} = require('../middlewares/uploadImageProduct')

router
    .get('/detail/:id',  detail)
    .get('/add',adminUserCheck, add)
    .delete('/delete/:id',destroy)
    //GET ALL PRODUCTS//
    .get('/', index)
    .get('/edit/:id',adminUserCheck, edit)
    .put('/update/:id',uploadProductImage.array('image'),productValidation, update)
    .post('/store',uploadProductImage.array('image'),productValidation, store)




module.exports = router;

