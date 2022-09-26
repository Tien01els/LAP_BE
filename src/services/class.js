const sequelize = require('sequelize')
const db = require('../models/index')

module.exports = {
  findClassesByTeacherId: async (teacherId) => {
    try {
      let classes = await db.Class.findAll({
        where: { teacherId: teacherId },
        raw: true,
      })
      return classes
    } catch (e) {
      console.log(e)
    }
  },
}
