const express = require('express')

const classRouter = express.Router()

classRouter.get('/:teacherId', (req, res) => {
  let teacherId = req && req.params && req.params.teacherId
  console.log(teacherId)

  return res.send('Hello')
})

module.exports = classRouter
