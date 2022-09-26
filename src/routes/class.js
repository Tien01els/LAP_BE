const express = require('express')
const classController = require('../controllers/class')

const classRouter = express.Router()

classRouter.get('/:teacherId', classController.getClasses)

module.exports = classRouter
