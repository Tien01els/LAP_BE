const sequelize = require('sequelize')
const db = require('../models/index')

module.exports = {
  createTopic: async (topic) => {
    try {
      let result = await db.Topic.create(topic)
      return result
    } catch (e) {
      console.log(e)
    }
  },
  getTopicByTeacherIdAndGradeId: async (teacherId, gradeId) => {
    try {
      let result = await db.Topic.findAll(
        {
          where: { teacherId, gradeId },
          raw: true,
          nest: true,
          duplicate: false,
        },
        { timestamps: false },
      )
      console.log(result)
      return result
    } catch (e) {
      console.log(e)
    }
  },
}
