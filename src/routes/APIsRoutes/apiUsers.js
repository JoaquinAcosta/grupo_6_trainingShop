const express = require('express');
const router = express.Router();

const{getById, verifyEmail, image, usersList} = require('../../controllers/APIs/apiUsersController');

router
    .get('/', usersList)
    .get('/:id', getById)
    .get('/veryfy-email', verifyEmail)
    .get('/image/:img', image)


    module.exports = router;