const express = require('express');
const router = express.Router();


const {detail, add, store, edit, update, index} = require ('../controllers/productsController')


router
    .get('/detail/:id',  detail)
    .get('/add', add)
    //GET ALL PRODUCTS//
    .get('/', index)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .post('/store', store)



module.exports = router;

