const assignmentRouter = require('./assignment');
const assignmentQuestionRouter = require('./assignmentQuestion');
const accountRouter = require('./account');
const classRouter = require('./class');
const classAssignmentRouter = require('./classAssignment');
const classTopicRouter = require('./classTopic');
const gradeRouter = require('./grade');
const notificationContentRouter = require('./notificationContent');
const notificationRoomRouter = require('./notificationRoom');
const questionRouter = require('./question');
const roleRouter = require('./role');
const skillRouter = require('./skill');
const skillAssignmentRouter = require('./skillAssignment');
const standardRouter = require('./standard');
const studentRouter = require('./student');
const studentAssignmentRouter = require('./studentAssignment');
const studentQuestionRouter = require('./studentQuestion');
const studentSkillRouter = require('./studentSkill');
const studentTopicRouter = require('./studentTopic');
const topicRouter = require('./topic');
const fileRouter = require('./file');

const route = (app) => {
    app.use('/assignment', assignmentRouter);
    app.use('/assignment-question', assignmentQuestionRouter);
    app.use('/account', accountRouter);
    app.use('/class', classRouter);
    app.use('/class-assignment', classAssignmentRouter);
    app.use('/class-topic', classTopicRouter);
    app.use('/grade', gradeRouter);
    app.use('/notification-content', notificationContentRouter);
    app.use('/notification-room', notificationRoomRouter);
    app.use('/question', questionRouter);
    app.use('/role', roleRouter);
    app.use('/skill', skillRouter);
    app.use('/skill-assignment', skillAssignmentRouter);
    app.use('/standard', standardRouter);
    app.use('/student', studentRouter);
    app.use('/student-assignment', studentAssignmentRouter);
    app.use('/student-question', studentQuestionRouter);
    app.use('/student-skill', studentSkillRouter);
    app.use('/student-topic', studentTopicRouter);
    app.use('/topic', topicRouter);
    app.use('/file', fileRouter);
};
module.exports = route;
