var express = require('express');
var router = express.Router();

const {getById, image}=require('../../controllers/APis/apiUsersController')

router
   .get('/:id', getById)
   .get('/image/:img', image)

module.exports = router;
