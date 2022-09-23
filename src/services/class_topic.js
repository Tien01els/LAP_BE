const sequelize = require('sequelize');
const db = require('../models/index');

module.exports = {
    findTopicsByClassId: async (teacherId, classId) => {
        try {
            let topics = await db.Class_Topic.findAll(
                {
                    attributes: ['topicId'],
                    where: { classId: classId, isDeleted: 0 },
                    include: [
                        {
                            attributes: ['id', 'topicName', 'prerequisiteTopicId'],
                            model: db.Topic,
                            where: { teacherId: teacherId, isDeleted: 0 },
                            include: [
                                {
                                    attributes: [
                                        [
                                            sequelize.fn(
                                                'COUNT',
                                                sequelize.col('Topic.Skills.id')
                                            ),
                                            'numberSkill',
                                        ],
                                    ],
                                    model: db.Skill,
                                    where: {
                                        isDeleted: 0,
                                    },
                                },
                                {
                                    attributes: [
                                        ['id', 'prerequisiteTopicId'],
                                        ['topicName', 'prerequisiteTopicName'],
                                    ],
                                    model: db.Topic,
                                    where: {
                                        teacherId: teacherId,
                                        isDeleted: 0,
                                    },
                                },
                            ],
                            raw: true,
                            nest: true,
                        },
                    ],
                    raw: true,
                    nest: true,
                },
                { timestamps: false }
            );
            console.log(topics);
            return topics;
        } catch (e) {
            console.log(e);
        }
    },
};
