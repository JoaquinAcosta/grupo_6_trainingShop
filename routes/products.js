const express = require('express');
const router = express.Router();

const {detail, add, store, edit} = require ('../controllers/productsController')

router
    .get('/detail', detail)
    .get('/add', add)
    .post('/store', store)
    .get('/edit', edit)


module.exports = router;

