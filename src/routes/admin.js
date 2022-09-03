var express = require('express');
var router = express.Router();
const {index} = require('../controllers/adminController');


/*/admin*/
router
    .get('/',index);



module.exports = router;