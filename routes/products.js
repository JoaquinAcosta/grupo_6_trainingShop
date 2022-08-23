const express = require('express');
const router = express.Router();


const {detail, add, edit, update} = require ('../controllers/productsController')

router
    .get('/detail', detail)

    .get('/add', add)

    .get('/edit/:id',edit)
    .put('/update/:id',update)
   


module.exports = router;

