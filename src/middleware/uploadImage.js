const multer = require('multer');
const appRoot = require('app-root-path');
const helper = require('../helper/helper');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/image/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const uploadImage = multer({ storage: storage, fileFilter: helper.imageFilter });

module.exports = uploadImage;
