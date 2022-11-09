const { studentService } = require('../services/index')

module.exports = {
  getStudentsOfClass: async (req, res) => {
    let classId = req.params.classId
    let students = await studentService.findStudentsbyClassId(classId)
    return res.send(students)
  },

  addStudentToClass: async (req, res) => {
    let classId = req.params.classId
    let studentEmail = req.body.studentEmail
    let resp = await studentService.addStudentToClass(classId, studentEmail)
    return res.send(resp)
  },

  removeStudentFromClass: async (req, res) => {
    let studentId = req.params.studentId
    await studentService.removeStudentFromClass(studentId)
    return res.send(204)
  },
}
