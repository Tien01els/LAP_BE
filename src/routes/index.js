const classTopicRouter = require('./classTopic');
const assignmentRouter = require('./assignment');
const classRouter = require('./class');
const roleRouter = require('./role');
const studentRouter = require('./student');
const studentTopcRouter = require('./studentTopic');
const topicRouter = require('./topic');
const gradeRouter = require('./grade');

const route = (app) => {
    app.use('/role', roleRouter);
    app.use('/topic', topicRouter);
    app.use('/grade', gradeRouter);
    app.use('/student', studentRouter);
    app.use('/studentTopic', studentTopcRouter);
    app.use('/class-topic', classTopicRouter);
    app.use('/assignment', assignmentRouter);
    app.use('/class', classRouter);
};
module.exports = route;
