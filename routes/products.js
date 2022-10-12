const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

const {detail, add, store, edit, update, index, destroy} = require ('../controllers/productsController')

const adminUserCheck = require('../middlewares/adminUserCheck');

router
    .get('/detail/:id',  detail)
    .get('/add',adminUserCheck, add)
    .delete('/delete/:id',destroy)
    //GET ALL PRODUCTS//
    .get('/', index)
    .get('/edit/:id',adminUserCheck, edit)
    .put('/update/:id',update)
    .post('/store', store)



module.exports = router;

