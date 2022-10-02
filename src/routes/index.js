const assignmentRouter = require('./assignment');
const classRouter = require('./class');
const classAssignmentRouter = require('./classAssignment');
const classTopicRouter = require('./classTopic');
const gradeRouter = require('./grade');
const questionRouter = require('./question');
const roleRouter = require('./role');
const skillAssignmentRouter = require('./skillAssignment');
const studentRouter = require('./student');
const studentTopicRouter = require('./studentTopic');
const topicRouter = require('./topic');

const route = (app) => {
    app.use('/assignment', assignmentRouter);
    app.use('/class', classRouter);
    app.use('/classAssignment', classAssignmentRouter);
    app.use('/class-topic', classTopicRouter);
    app.use('/grade', gradeRouter);
    app.use('/question', questionRouter);
    app.use('/role', roleRouter);
    app.use('/skill-assignment', skillAssignmentRouter);
    app.use('/student', studentRouter);
    app.use('/studentTopic', studentTopicRouter);
    app.use('/topic', topicRouter);
};
module.exports = route;
