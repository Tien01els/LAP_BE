const roleRouter = require('./role');
const topicRouter = require('./topic');
const classTopicRouter = require('./class_topic');

const route = (app) => {
    app.use('/role', roleRouter);
    app.use('/topic', topicRouter);
    app.use('/class-topic', classTopicRouter);
};

module.exports = route;
