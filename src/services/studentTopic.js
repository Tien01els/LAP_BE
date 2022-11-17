const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createStudentTopic: async (studentTopic) => {
        try {
            let studentTopicNew = await db.Student_Topic.create(studentTopic);
            return respMapper(200, studentTopicNew);
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    deleteStudentTopic: async (studentId, topicId) => {
        try {
            let studentTopic = await db.Student_Topic.findOne({
                where: { studentId, topicId },
            });
            if (studentTopic) {
                if (studentTopic.isDeleted) {
                    return errorResp(400, 'Topic in this student has been deleted');
                }
                studentTopic.isDeleted = true;
                return respMapper(200, await studentTopic.save());
            }
            return errorResp(400, 'This topic of student does not exist');
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
