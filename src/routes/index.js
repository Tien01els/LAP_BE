const roleRouter = require('./role');
const topicRouter = require('./topic');
const gradeRouter = require('./grade');
const classTopicRouter = require('./classTopic');

const route = (app) => {
    app.use('/role', roleRouter);
    app.use('/topic', topicRouter);
    app.use('/grade', gradeRouter);
    app.use('/class-topic', classTopicRouter);
};

module.exports = route;
