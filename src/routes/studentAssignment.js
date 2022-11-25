const express = require('express')
const { studentAssignmentController } = require('../controllers/index')

const studentAssignmentRouter = express.Router()

studentAssignmentRouter.post(
  '/',
  studentAssignmentController.postStudentAssignment,
)

studentAssignmentRouter.post(
  '/assign-list-student',
  studentAssignmentController.postListStudentAssignment,
)

module.exports = studentAssignmentRouter
