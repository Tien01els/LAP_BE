const sequelize = require('sequelize')
const db = require('../models/index')

module.exports = {
  findAssignmentsByTeacherId: async (teacherId) => {
    try {
      let assignments = await db.Assignment.findAll({
        where: { teacherId: teacherId },
      })
      console.log(assignments)
      return assignments
    } catch (e) {
      console.log(e)
    }
  },
}