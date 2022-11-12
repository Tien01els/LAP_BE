const express = require('express');
const { fileController } = require('../controllers/index');
const uploadImage = require('../middleware/uploadImage');

const fileRouter = express.Router();

fileRouter.post('/image', uploadImage.single('image'), fileController.uploadImage);
fileRouter.get('/image/:filename', fileController.getImage);

module.exports = fileRouter;
