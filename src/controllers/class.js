const { findClassesByTeacherId } = require('../services/class')

module.exports = {
  getClasses: async (req, res) => {
    let teacherId = req && req.params && req.params.teacherId
    let classes = await findClassesByTeacherId(teacherId)
    console.log(classes)
    return res.send(classes)
  },
}
