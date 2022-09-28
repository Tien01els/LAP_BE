const { findAssignmentsByTeacherId } = require('../services/assignment')

module.exports = {
  //load assignments
  getDeadlines: async (req, res) => {
    let teacherId = req && req.params && req.params.teacherId
    let assignments = await findAssignmentsByTeacherId(teacherId)
    return res.send(assignments)
  },
}