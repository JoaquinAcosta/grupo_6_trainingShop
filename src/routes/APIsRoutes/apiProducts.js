const express = require('express');
const router = express.Router();

const {all, detail, update, destroy,  image, store, newest} = require('../../controllers/APIs/apiProductsController');
const { checkToken, checkRol, uploadImageProduct } = require('../../middlewares/APisMiddlewares');

router  
    .get('/', all)
    .get('/:id', detail)
    .get('/detail/new', newest)
    .post('/', uploadImageProduct.array('images') ,/* checkToken,checkRol, */store)
    .patch('/:id', uploadImageProduct.array('images'), /* checkToken, checkRol, */ update)
    .delete('/:id', destroy)
    .get('/image/:img', image)
module.exports = router