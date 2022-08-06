const express = require('express');
const router = express.Router();

const {detail} = require ('../controllers/productsController')

router
    .get('/detail', detail)

module.exports = router;

