const express = require('express')
const { studentController } = require('../controllers/index')
const student = require('../services/student')

const studentRouter = express.Router()

studentRouter.get('/class/:classId', studentController.getStudentsOfClass)
studentRouter.post('/class/:classId', studentController.addStudentToClass)
studentRouter.delete(
  '/:studentId/class',
  studentController.removeStudentFromClass,
)

// studentRouter.post('/', studentController.postClassTopic);

module.exports = studentRouter
