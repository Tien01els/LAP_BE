const classTopicRouter = require('./classTopic')
const assignmentRouter = require('./assignment')
const classRouter = require('./class')
const roleRouter = require('./role')
const topicRouter = require('./topic')
const gradeRouter = require('./grade')

const route = (app) => {
  app.use('/role', roleRouter)
  app.use('/topic', topicRouter)
  app.use('/grade', gradeRouter)
  app.use('/class-topic', classTopicRouter)
  app.use('/assignment', assignmentRouter)
  app.use('/class', classRouter)
}
module.exports = route
