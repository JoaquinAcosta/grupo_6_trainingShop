const express = require('express');
const router = express.Router();

const{usersList, getById, image, verifyEmail} = require('../../controllers/APIs/apiUsersController');

router
    .get('/', usersList)
    .get('/:id', getById)
    .get('/image/:img', image)
    .get('/veryfy-email', verifyEmail)


    module.exports = router;