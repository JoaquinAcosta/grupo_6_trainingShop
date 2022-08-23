const express = require('express');
const router = express.Router();

const {detail, add, store, edit, update} = require ('../controllers/productsController')

router
    .get('/detail', detail)
    .get('/add', add)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .post('/store', store)



module.exports = router;

