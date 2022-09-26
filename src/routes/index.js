const roleRouter = require('./role')
const topicRouter = require('./topic')
const classTopicRouter = require('./class_topic')
const assignmentRouter = require('./assignment')
const classRouter = require('./class')

const route = (app) => {
  app.use('/role', roleRouter)
  app.use('/topic', topicRouter)
  app.use('/class-topic', classTopicRouter)
  app.use('/assignment', assignmentRouter)
  app.use('/class', classRouter)
}

module.exports = route
