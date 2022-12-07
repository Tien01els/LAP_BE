const sequelize = require('sequelize');
const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    createStudentTopic: async (studentTopic) => {
        try {
            let studentTopicNew = await db.Student_Topic.create(studentTopic);
            return respMapper(200, studentTopicNew);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    deleteStudentTopic: async (studentId, topicId) => {
        try {
            let studentTopic = await db.Student_Topic.findOne({
                where: { studentId, topicId },
            });
            studentTopic.isDeleted = true;
            await studentTopic.save();
            return respMapper(204, 'Successfully deleted topic of student');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findTopicsOfStudent: async (studentId, classId) => {
        try {
            // const topicsOfClass = await db.Class_Topic.findAll({
            //     where: { classId, isDeleted: false },
            //     attributes: {
            //         exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            //     },
            // });

            // let currentTopiIdsOfClass = [];
            // currentTopiIdsOfClass = topicsOfClass.map((topic) => topic.topicId);
            // let currentTopicsOfStudent = await db.Student_Topic.findAll({
            //     where: { studentId, isDeleted: false },
            //     attributes: {
            //         exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            //     },
            // });

            // let currentTopicIdsOfStudent = [];
            // currentTopicIdsOfStudent = currentTopicsOfStudent.map((topic) => topic.topicId);

            // let listExistTopic = [];
            // let listUpdateTopic = [];
            // for (let i = 0; i < currentTopicIdsOfStudent.length; i++) {
            //     if (currentTopiIdsOfClass.includes(currentTopicIdsOfStudent[i])) {
            //         listExistTopic.push(currentTopicIdsOfStudent[i]);
            //         await db.Student_Topic.update(
            //             { isDeleted: false },
            //             {
            //                 where: {
            //                     studentId,
            //                     topicId: currentTopicIdsOfStudent[i],
            //                     isDeleted: false,
            //                 },
            //             }
            //         );
            //         continue;
            //     }
            //     await db.Student_Topic.update(
            //         { isDeleted: true },
            //         {
            //             where: {
            //                 studentId,
            //                 topicId: currentTopicIdsOfStudent[i],
            //                 isDeleted: false,
            //             },
            //         }
            //     );
            // }
            // for (let i = 0; i < currentTopiIdsOfClass.length; i++)
            //     if (!listExistTopic.includes(currentTopiIdsOfClass[i]))
            //         listUpdateTopic.push(currentTopiIdsOfClass[i]);

            // const listStudentTopic = new Array();
            // for (let i = 0; i < listUpdateTopic.length; ++i) {
            //     const topic = await db.Topic.findByPk(listUpdateTopic[i], {
            //         where: { isDeleted: false },
            //         attributes: {
            //             exclude: ['isDeleted', 'createdAt', 'updatedAt'],
            //         },
            //     });
            //     listStudentTopic.push({
            //         studentId: studentId,
            //         topicId: listUpdateTopic[i],
            //         isDeleted: false,
            //         status: 0,
            //         isUnlock: topic?.prerequisiteTopicId ? true : null,
            //         isPass: false,
            //     });
            // }
            // await db.Student_Topic.bulkCreate(listStudentTopic);
            const result = await db.sequelize.query(
                `
                SELECT st.id, st.status, st.isUnlock, st.isPass, st.dateRequest, st.notificationContentId,
                t.topicName, t.topicImg, pt.topicName AS prerequisiteTopicName, COUNT(s.id) AS numberSkills, t.description, t.id AS topicId
                FROM student_topics AS st JOIN topics AS t
                ON st.studentId = :studentId AND t.id = st.topicId AND st.isDeleted = 0 AND t.isDeleted = 0
                LEFT JOIN topics as pt ON pt.id = t.prerequisiteTopicId AND pt.isDeleted = 0 
                LEFT JOIN skills AS s ON s.topicId = t.id AND s.isDeleted = 0 
                GROUP BY st.topicId
                ORDER BY pt.id
                `,
                {
                    replacements: { studentId },
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            return respMapper(200, result);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
    findAllPercentSkillsOfStudent: async (studentId) => {
        try {
            let passSkillOfTopic = await db.Student_Topic.findAll({
                where: { studentId, isDeleted: false },
                attributes: [
                    'topicId',
                    'topic.topicName',
                    [
                        sequelize.fn('COUNT', sequelize.col('topic.skill.studentSkill.id')),
                        'numberPassSkillOfTopic',
                    ],
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Topic,
                        as: 'topic',
                        where: { isDeleted: 0 },
                        include: [
                            {
                                attributes: [],
                                model: db.Skill,
                                as: 'skill',
                                where: { isDeleted: 0 },
                                // right: true,
                                include: [
                                    {
                                        attributes: [],
                                        model: db.Student_Skill,
                                        as: 'studentSkill',
                                        where: { isPass: 1, isDeleted: 0 },
                                        required: false,
                                    },
                                ],
                            },
                        ],
                    },
                ],
                group: ['topicId'],
                raw: true,
            });
            let totalSkillOfTopic = await db.Student_Topic.findAll({
                where: { studentId, isDeleted: false },
                attributes: [
                    'topicId',
                    'topic.topicName',
                    [
                        sequelize.fn('COUNT', sequelize.col('topic.skill.id')),
                        'numberTotalSkillOfTopic',
                    ],
                ],
                include: [
                    {
                        attributes: [],
                        model: db.Topic,
                        as: 'topic',
                        where: { isDeleted: 0 },
                        include: [
                            {
                                attributes: [],
                                model: db.Skill,
                                as: 'skill',
                                where: { isDeleted: 0 },
                                required: false,
                            },
                        ],
                    },
                ],
                group: ['topicId'],
                raw: true,
            });
            let result = new Array();
            for (let i = 0; i < totalSkillOfTopic.length; ++i) {
                const passSkill = passSkillOfTopic.find(
                    (passSkill) => passSkill.topicId === totalSkillOfTopic[i].topicId
                );
                result.push({
                    ...totalSkillOfTopic[i],
                    numberPassSkillOfTopic: passSkill ? passSkill.numberPassSkillOfTopic : 0,
                });
            }
            return respMapper(200, result);
        } catch (error) {
            console.log(error.message);
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
