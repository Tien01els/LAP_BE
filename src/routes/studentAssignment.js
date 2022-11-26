const express = require('express')
const { studentAssignmentController } = require('../controllers/index')

const studentAssignmentRouter = express.Router()

studentAssignmentRouter.post(
  '/',
  studentAssignmentController.postStudentAssignment,
)

studentAssignmentRouter.put(
  '/assignment/:assignmentId/assign-list-student',
  studentAssignmentController.assignForListStudent,
)

module.exports = studentAssignmentRouter
