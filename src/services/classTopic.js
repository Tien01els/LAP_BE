const sequelize = require('sequelize')
const db = require('../models/index')

module.exports = {
  findTopicsByClassId: async (teacherId, classId) => {
    try {
      let topics = await db.sequelize.query(
        `
                SELECT c.topicId, t.topicName, pt.topicName AS prerequisiteTopicName, COUNT(s.id) AS numberSkills
                FROM class_topics AS c JOIN topics AS t
                ON c.classId = :classId AND t.id = c.topicId AND t.teacherId = :teacherId
                AND c.isDeleted = 0 AND t.isDeleted = 0
                LEFT JOIN topics as pt ON pt.id = t.prerequisiteTopicId AND pt.isDeleted = 0 
                LEFT JOIN skills AS s ON s.topicId = t.id AND s.isDeleted = 0  
                GROUP BY c.topicId
                `,
        {
          replacements: { teacherId: teacherId, classId: classId },
          type: sequelize.QueryTypes.SELECT,
        },
      )
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
      console.log(topics)
      return topics
    } catch (e) {
      console.log(e)
    }
  },
}
