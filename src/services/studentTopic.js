const db = require('../models/index');

module.exports = {
    createStudentTopic: async (studentTopic) => {
        try {
            let studentTopicNew = await db.Student_Topic.create(studentTopic);
            return studentTopicNew;
        } catch (e) {
            console.log(e);
        }
    },
    deleteStudentTopic: async (studentId, topicId) => {
        try {
            let studentTopic = await db.Student_Topic.findOne({
                where: { studentId, topicId },
            });
            if (studentTopic) {
                if (studentTopic.isDeleted) {
                    return 'Topic in this student has been deleted';
                }
                studentTopic.isDeleted = true;
                return await studentTopic.save();
            }
            return 'This topic of student does not exist';
        } catch (e) {
            console.log(e);
        }
    },
};
