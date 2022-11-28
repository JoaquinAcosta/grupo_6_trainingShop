const express = require('express');
const router = express.Router();

const {all, detail, update, /* store,  destroy, */ image} = require('../../controllers/APIs/apiProductsController');
const { checkToken, checkRol, uploadImageProduct } = require('../../middlewares/APisMiddlewares');

router  
    .get('/', all)
    .get('/:id', detail)
   // .post('/',uploadImageProduct.array('images') ,checkToken,checkRol,store)
    .patch('/:id', uploadImageProduct.array('images'), /* checkToken, checkRol, */ update)
    //.delete('/:id', checkToken, checkRol, destroy)
    .get('/image/:img', image)
module.exports = router