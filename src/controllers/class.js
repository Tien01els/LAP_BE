const { findClassesByTeacherId } = require('../services/class')

module.exports = {
  getClasses: async (req, res) => {
    let teacherId = req && req.params && req.params.teacherId
    let classes = await findClassesByTeacherId(teacherId)
    return res.send(classes)
  },
}
