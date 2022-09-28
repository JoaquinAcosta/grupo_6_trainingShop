var express = require('express');
var router = express.Router();
const {index} = require('../controllers/adminController');

const adminUserCheck = require('../middlewares/adminUserCheck');


/*/admin*/
router
    .get('/',adminUserCheck, index);



module.exports = router;