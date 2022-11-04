var express = require('express');
var router = express.Router();

const {getById}=require('../../controllers/APis/apiUsersController')

router
   .get('/:id', getById)


module.exports = router;
