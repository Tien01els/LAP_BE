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
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
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
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
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
            if (existedClassTopic) return errorResp(409, 'Topic of class has existed');

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
                    isDeleted: false,
                    studentId: students[i].id,
                    topicId: classTopic.topicId,
                });
            }
            await db.Student_Topic.bulkCreate(studentTopics);
            if (isUnlock) {
                const listSkillOfTopic = await db.Skill.findAll({
                    where: { topicId: classTopic.topicId, isDeleted: 0 },
                });

                const skillOfStudent = new Array();
                for (let i = 0; i < students.length; i++)
                    for (let j = 0; j < listSkillOfTopic.length; ++j) {
                        skillOfStudent.push({
                            studentId: students[i].id,
                            skillId: listSkillOfTopic[j].id,
                            status: 0,
                            isPass: false,
                            isDeleted: false,
                        });
                    }

                if (skillOfStudent) {
                    await db.Student_Skill.bulkCreate(skillOfStudent);

                    let listAssignmentOfSkill = new Array();
                    for (let i = 0; i < listSkillOfTopic.length; ++i) {
                        const assignmentOfSkill = await db.Skill_Assignment.findAll({
                            where: { skillId: listSkillOfTopic[i].id, isDeleted: 0 },
                            include: [
                                {
                                    model: db.Assignment,
                                    as: 'assignment',
                                    where: { isDeleted: 0 },
                                },
                            ],
                        });
                        listAssignmentOfSkill = [...listAssignmentOfSkill, ...assignmentOfSkill];
                    }

                    const assignmentOfStudent = new Array();

                    for (let i = 0; i < students.length; i++)
                        for (let j = 0; j < listAssignmentOfSkill.length; ++j) {
                            assignmentOfStudent.push({
                                studentId: students[i].id,
                                assignmentId: listAssignmentOfSkill[j].assignmentId,
                                status: 0,
                                dateDue: listAssignmentOfSkill[j].assignment.dateDue,
                                redo: listAssignmentOfSkill[j].assignment.redo,
                                isRedo: false,
                                isDeleted: false,
                            });
                        }
                    assignmentOfStudent.length &&
                        (await db.Student_Assignment.bulkCreate(assignmentOfStudent));
                }
            }
            return respMapper(200, classTopicNew);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    deleteClassTopic: async (id) => {
        try {
            let classTopic = await db.Class_Topic.findByPk(id);
            if (!classTopic) return errorResp(422, 'Not found topic of class');
            classTopic.isDeleted = true;
            const classTopicDeleted = await classTopic.save();
            if (
                (typeof classTopicDeleted === 'object' ||
                    typeof classTopicDeleted === 'function') &&
                classTopicDeleted !== null
            ) {
                let students = await db.Student.findAll({
                    where: { classId: classTopicDeleted.classId, isDeleted: 0 },
                });
                for (let i = 0; i < students.length; ++i)
                    await db.Student_Topic.update(
                        { isDeleted: true },
                        {
                            where: {
                                studentId: students[i].id,
                                topicId: classTopic.topicId,
                                isDeleted: false,
                            },
                        }
                    );

                const skillOfTopic = await db.Skill.findAll({
                    where: { topicId: classTopic.topicId, isDeleted: false },
                });
                for (let i = 0; i < students.length; ++i)
                    for (let j = 0; j < skillOfTopic.length; ++j) {
                        await db.Student_Skill.update(
                            { isDeleted: true },
                            {
                                where: {
                                    studentId: students[i].id,
                                    skillId: skillOfTopic[j].id,
                                    isDeleted: false,
                                },
                            }
                        );
                    }

                let listAssignmentOfSkill = new Array();
                for (let i = 0; i < skillOfTopic.length; ++i) {
                    const assignmentOfSkill = await db.Skill_Assignment.findAll({
                        where: { skillId: skillOfTopic[i].id, isDeleted: 0 },
                    });
                    listAssignmentOfSkill = [...listAssignmentOfSkill, ...assignmentOfSkill];
                }
                for (let i = 0; i < students.length; ++i)
                    for (let j = 0; j < listAssignmentOfSkill.length; ++j) {
                        await db.Student_Assignment.update(
                            { isDeleted: true },
                            {
                                where: {
                                    studentId: students[i].id,
                                    assignmentId: listAssignmentOfSkill[j].assignmentId,
                                    isDeleted: false,
                                },
                            }
                        );
                    }
            }
            return respMapper(204, 'Successfully deleted topic of class');
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findRoadMap: async (classId) => {
        try {
            let topics = await db.sequelize.query(
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
            return respMapper(200, topics);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
