var express = require('express');
var router = express.Router();
const { cart } = require('../controllers/productCartController')

/* /productCart */
router
    .get('/cart', cart);

module.exports = router;