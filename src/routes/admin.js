var express = require('express');
var router = express.Router();
const {productsTable, usersTable} = require('../controllers/adminController');

const adminUserCheck = require('../middlewares/adminUserCheck');


/*/admin*/
router
    .get('/products',adminUserCheck, productsTable)
    .get('/users',adminUserCheck,usersTable)



module.exports = router;