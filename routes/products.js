const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

const {detail, add, store, edit, update, index, destroy} = require ('../controllers/productsController')

router
    .get('/detail/:id',  detail)
    .get('/add', add)
    .delete('/delete/:id',destroy)
    //GET ALL PRODUCTS//
    .get('/', index)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .post('/store', store)



module.exports = router;

