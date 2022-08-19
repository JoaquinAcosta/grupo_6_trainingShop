const express = require('express');
const router = express.Router();

const {detail, add, edit, index} = require ('../controllers/productsController')

router
    .get('/detail', detail)
    .get('/add', add)
    .get('/edit', edit)
    //GET ALL PRODUCTS//
    .get('/', index)


module.exports = router;

