const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findTopicsOfTeacherByClass: async (teacherId, classId) => {
        try {
            let topics = await db.sequelize.query(
                `
                SELECT c.id, t.topicName, t.topicImg, pt.topicName AS prerequisiteTopicName, COUNT(s.id) AS numberSkills, t.description, t.id AS topicId 
                FROM class_topics AS c JOIN topics AS t
                ON c.classId = :classId AND t.id = c.topicId AND t.teacherId = :teacherId
                AND c.isDeleted = 0 AND t.isDeleted = 0
                LEFT JOIN topics as pt ON pt.id = t.prerequisiteTopicId AND pt.isDeleted = 0 
                LEFT JOIN skills AS s ON s.topicId = t.id AND s.isDeleted = 0 
                GROUP BY c.topicId
                ORDER BY pt.id
                `,
                {
                    replacements: { teacherId, classId },
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            //     {
            //         attributes: ['topicId'],
            //         where: { classId: classId, isDeleted: 0 },
            //         include: [
            //             {
            //                 attributes: [
            //                     'id',
            //                     'topicName',
            //                     'prerequisiteTopicId',
            //                     [
            //                         sequelize.fn(
            //                             'COUNT',
            //                             sequelize.col('Topic.Skills.id')
            //                         ),
            //                         'numberSkill',
            //                     ],
            //                 ],
            //                 model: db.Topic,
            //                 where: { teacherId: teacherId, isDeleted: 0 },
            //                 include: [
            //                     {
            //                         attributes: ['id'],
            //                         model: db.Skill,
            //                         where: {
            //                             teacherId: teacherId,
            //                             isDeleted: 0,
            //                         },
            //                         required: false,
            //                         duplicate: false,
            //                     },
            //                     {
            //                         attributes: [
            //                             ['id', 'prerequisiteTopicId'],
            //                             ['topicName', 'prerequisiteTopicName'],
            //                         ],
            //                         model: db.Topic,
            //                         where: {
            //                             teacherId: teacherId,
            //                             isDeleted: 0,
            //                         },
            //                         required: false,
            //                         duplicate: false,
            //                     },
            //                 ],
            //                 group: ['id'],
            //                 raw: true,
            //                 nest: true,

            //                 having: { numberSkill: 0 },
            //                 duplicate: false,
            //             },
            //         ],
            //         raw: true,
            //         nest: true,
            //         duplicate: false,
            //     },
            //     { timestamps: false }
            // );

            return respMapper(200, topics);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findTopicsOfClassForStudent: async (classId) => {
        try {
            const classTopic = await db.sequelize.query(
                `
                    SELECT c.id, t.topicName, t.topicImg, pt.topicName AS prerequisiteTopicName, COUNT(s.id) AS numberSkills, t.description, t.id AS topicId 
                    FROM class_topics AS c JOIN topics AS t
                    ON c.classId = :classId AND t.id = c.topicId
                    AND c.isDeleted = 0 AND t.isDeleted = 0
                    LEFT JOIN topics as pt ON pt.id = t.prerequisiteTopicId AND pt.isDeleted = 0 
                    LEFT JOIN skills AS s ON s.topicId = t.id AND s.isDeleted = 0 
                    GROUP BY c.topicId
                    ORDER BY pt.id
                    `,
                {
                    replacements: { classId },
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            return respMapper(200, classTopic);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },

    createClassTopic: async (classTopic, isUnlock) => {
        try {
            const existedClassTopic = await db.Class_Topic.findOne({
                where: { classId: classTopic.classId, topicId: classTopic.topicId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            if (existedClassTopic) return errorResp(400, 'Topic in class is exist');

            let classTopicNew = await db.Class_Topic.create(classTopic);
            let students = await db.Student.findAll({
                where: { classId: classTopic.classId, isDeleted: 0 },
                attributes: {
                    exclude: ['accountId', 'isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            let studentTopics = new Array();
            for (let i = 0; i < students.length; i++) {
                studentTopics.push({
                    status: 0,
                    isUnlock: isUnlock,
                    isDeleted: 0,
                    studentId: students[i].id,
                    topicId,
                });
            }
            await db.Student_Topic.bulkCreate(studentTopics);
            return respMapper(200, classTopicNew);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    deleteClassTopic: async (id) => {
        try {
            let classTopic = await db.Class_Topic.findByPk(id);
            if (classTopic) {
                if (classTopic.isDeleted) {
                    return 'This topic in class has been deleted';
                }
                classTopic.isDeleted = true;
                return await classTopic.save();
            }

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

            return 'This topic of class does not exist';
        } catch (e) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
