const roleRouter = require('./role');
const topicRouter = require('./topic');
<<<<<<< HEAD
const gradeRouter = require('./grade');
const classTopicRouter = require('./classTopic');
=======
<<<<<<< Updated upstream
const classTopicRouter = require('./class_topic');
=======
const gradeRouter = require('./grade');
const classRouter = require('./class');
const classTopicRouter = require('./classTopic');
>>>>>>> Stashed changes
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d

const route = (app) => {
    app.use('/role', roleRouter);
    app.use('/topic', topicRouter);
<<<<<<< HEAD
    app.use('/grade', gradeRouter);
=======
<<<<<<< Updated upstream
=======
    app.use('/grade', gradeRouter);
    app.use('/class', classRouter);
>>>>>>> Stashed changes
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
    app.use('/class-topic', classTopicRouter);
};

module.exports = route;
