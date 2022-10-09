const { assignmentService } = require('../services/index')

module.exports = {
  //load assignments
  getAssignmentsOfTeacher: async (req, res) => {
    let teacherId = req.params.teacherId
    console.log(req.params.teacherId)
    let assignments = await assignmentService.findAssignmentsByTeacherId(
      teacherId,
    )
    return res.send(assignments)
  },
  postAssignment: async (req, res) => {
    let assignment = {
      assignmentName: req.body.assignmentName,
      dateDue: req.body.dateDue || new Date(),
      time: req.body.time || 0,
      totalScore: req.body.totalScore || 100,
      redo: req.body.redo || 0,
      teacherId: req.body.teacherId,
      isDeleted: 0,
    }
    let assignmentNew = await assignmentService.createAssignment(assignment)
    return res.send(assignmentNew)
  },
}
