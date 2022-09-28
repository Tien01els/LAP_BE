const express = require('express')
const dashboardController = require('../controllers/assignment')

const assignmentRouter = express.Router()
// :teacherId dashboardController.getDeadlines
assignmentRouter.get('/:teacherId', dashboardController.getDeadlines)

module.exports = assignmentRouter
