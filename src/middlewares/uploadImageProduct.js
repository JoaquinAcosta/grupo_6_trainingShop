const path = require('path');
const multer = require('multer');

const storageProductImage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/productsImage')
    },
    filename : (req,file,callback) => {
        callback(null,'product-' + Date.now() + path.extname(file.originalname))
        
    }
});

const uploadProductImage = multer({
    storage : storageProductImage
});

module.exports = {
    uploadProductImage
}