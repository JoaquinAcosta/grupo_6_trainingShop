const express = require('express');
const router = express.Router();

const {all} = require('../../controllers/APIs/apiCategories');
/* const { checkToken, checkRol, uploadImageProduct } = require('../../middlewares/APisMiddlewares'); */

router  
    .get('/', all)
    
module.exports = router