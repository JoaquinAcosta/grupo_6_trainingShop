const path = require('path');
const multer = require('multer');

const storageImageProfile = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/profilesImage' )
    },
    filename : (req,file,callback) => {
        callback(null,'avatar-' + Date.now() + path.extname(file.originalname))
        
    }
});

const uploadImageProfile = multer({
    storage : storageImageProfile
});

module.exports = {
    uploadImageProfile
}