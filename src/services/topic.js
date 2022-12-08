const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');
const fs = require('fs');
const { promisify } = require('util');
const appRoot = require('app-root-path');

const unlinkAsync = promisify(fs.unlink);

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
            if (!topic) return errorResp(422, 'Topic not found');

            return respMapper(200, topic);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
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
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    createTopic: async (topic) => {
        try {
            const newTopic = await db.Topic.create(topic);
            return respMapper(200, {
                message: 'Successfully added topic',
                topic: newTopic,
            });
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
    findTopicByTeacherId: async (teacherId) => {
        try {
            let topics = await db.Topic.findAll({
                where: { teacherId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, topics);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    updateTopic: async (id, teacherId, topic) => {
        try {
            const existingTopic = await db.Topic.findByPk(id, {
                where: { isDeleted: 0 },
            });
            if (!existingTopic) return errorResp(422, 'Topic not found');
            if (existingTopic.teacherId !== teacherId)
                return errorResp(403, "You don't have permission to edit");

            const arrUrlExistTopicImg = existingTopic.topicImg && existingTopic.topicImg.split('/');
            const arrUrlTopicImg = topic && topic.topicImg && topic.topicImg.split('/');
            if (
                arrUrlExistTopicImg &&
                arrUrlExistTopicImg.length > 0 &&
                arrUrlTopicImg &&
                arrUrlTopicImg.length > 0 &&
                arrUrlExistTopicImg[arrUrlExistTopicImg.length - 1] &&
                arrUrlTopicImg[arrUrlTopicImg.length - 1] &&
                arrUrlExistTopicImg[arrUrlExistTopicImg.length - 1] !==
                    arrUrlTopicImg[arrUrlTopicImg.length - 1]
            )
                try {
                    await unlinkAsync(
                        'src/public/image/' + arrUrlExistTopicImg[arrUrlExistTopicImg.length - 1]
                    );
                } catch (error) {
                    console.log(error);
                }

            await existingTopic.update({ ...topic });
            return respMapper(200, 'Successfully updated topic');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
