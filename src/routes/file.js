const express = require('express');
const { fileController } = require('../controllers/index');
const uploadImage = require('../middleware/uploadImage');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const fileRouter = express.Router();

fileRouter.post('/image', verifyToken, uploadImage.single('image'), fileController.uploadImage);
fileRouter.get('/image/:filename', fileController.getImage);

module.exports = fileRouter;
