const express = require('express');
const { fileController } = require('../controllers/index');
const uploadImage = require('../middleware/uploadImage');
const verifyToken = require('../middleware/auth');

const fileRouter = express.Router();

fileRouter.post('/image', verifyToken, uploadImage.single('image'), fileController.uploadImage);
fileRouter.get('/image/:filename', fileController.getImage);

module.exports = fileRouter;
