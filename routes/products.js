const express = require('express');
const router = express.Router();

const {detail, add, edit} = require ('../controllers/productsController')

router
    .get('/detail/:id',  detail)
    .get('/add', add)
    .get('/edit', edit)


module.exports = router;

