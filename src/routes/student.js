const express = require('express');
const { studentController } = require('../controllers/index');

const studentRouter = express.Router();

studentRouter.get('/:classId', studentController.getStudentsOfClass);

// studentRouter.post('/', studentController.postClassTopic);

module.exports = studentRouter;
