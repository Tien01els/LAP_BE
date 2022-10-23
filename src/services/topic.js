const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findTopic: async (id) => {
        try {
            let topic = await db.Topic.findByPk(id, {
                where: { isDeleted: 0 },
                attributes: {
                    exclude: [
                        'teacherId',
                        'gradeId',
                        'prerequisiteTopicId',
                        'isDeleted',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                raw: true,
            });
            return respMapper(200, topic);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findAllTopics: async () => {
        try {
            let topics = await db.Topic.findAll({
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, topics);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    createTopic: async (topic) => {
        try {
            let result = await db.Topic.create(topic);
            console.log('result');
            return result;
        } catch (error) {
            console.log(error);
            throw errorResp(400, error.message);
        }
    },
    findTopicByTeacherIdAndGradeId: async (teacherId, gradeId) => {
        try {
            let result = await db.Topic.findAll(
                {
                    where: { teacherId, gradeId, isDeleted: 0 },
                    attributes: {
                        exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                    },
                    raw: true,
                    nest: true,
                    duplicate: false,
                },
                { timestamps: false }
            );
            return result;
        } catch (e) {
            console.log(e);
        }
    },
};
