const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

const {detail, add, edit, destroy} = require ('../controllers/productsController')

router
    .get('/detail', detail)
    .get('/add', add)
    .get('/edit', edit)
    .delete('/delete/:id',productsController.destroy)


module.exports = router;

