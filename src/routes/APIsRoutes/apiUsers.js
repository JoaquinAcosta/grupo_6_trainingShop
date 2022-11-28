const express = require('express');
const router = express.Router();

const{getAll, getById, veryEmail} = require('../../controllers/APIs/apiProductsController');

router
    .get('/', getAll)
    .get('/:id', getById)
    .get('/veryfy-email', veryEmail)


    module.exports = router;