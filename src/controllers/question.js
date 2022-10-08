const { questionService, skillQuestionService } = require('../services/index')

module.exports = {
  postQuestion: async (req, res) => {
    const question = {
      content: req.body.content,
      image: req.body.image || '',
      option: req.body.option && req.body.option.toString(),
      result: req.body.result,
      hint: req.body.hint,
      score: req.body.score,
      questionTypeId: req.body.questionTypeId,
      assignmentId: req.body.assignmentId,
      isDeleted: 0,
    }
    let questionNew = await questionService.createQuestion(question)

    const skillIds = req.body.skillIds

    const listSkillQuestion = new Array()
    for (let i = 0; i < skillIds.length; ++i) {
      listSkillQuestion.push({
        questionId: questionNew.id,
        skillId: skillIds[i],
        isDeleted: 0,
      })
    }
    const skillQuestion = await skillQuestionService.createSkillQuestion(
      listSkillQuestion,
    )

    questionNew.option = questionNew.option.split(',')
    return res.send(questionNew)
  },
  getQuestionOfAssignment: async (req, res) => {
    let assignmentId = req.params.assignmentId
    let questions = await questionService.findQuestionByAssignmentId(
      assignmentId,
    )

    for (let i = 0; i < questions.length; i++) {
      questions[i].option =
        questions[i].option && questions[i].option.split(',')
    }
    return res.send(questions)
  },
  deleteQuestion: async (req, res) => {
    let id = req.params.id
    let questionDeleted = await questionService.deleteQuestion(id)
    return res.send(questionDeleted)
  },
}
