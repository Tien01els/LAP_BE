const roleRouter = require('./role');
const topicRouter = require('./topic');
<<<<<<< Updated upstream
const classTopicRouter = require('./class_topic');
=======
const gradeRouter = require('./grade');
const classRouter = require('./class');
const classTopicRouter = require('./classTopic');
>>>>>>> Stashed changes

const route = (app) => {
    app.use('/role', roleRouter);
    app.use('/topic', topicRouter);
<<<<<<< Updated upstream
=======
    app.use('/grade', gradeRouter);
    app.use('/class', classRouter);
>>>>>>> Stashed changes
    app.use('/class-topic', classTopicRouter);
};

module.exports = route;
