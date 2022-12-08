const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAllGrades: async () => {
        try {
            let grades = await db.Grade.findAll({
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, grades);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
    findGradeByTeacher: async (teacherId) => {
        try {
            let grades = await db.Class.findAll({
                attributes: ['grade.id', 'grade.gradeName'],
                where: { teacherId, isDeleted: 0 },
                raw: true,
                include: [
                    {
                        attributes: [],
                        model: db.Grade,
                        as: 'grade',
                        where: { isDeleted: 0 },
                        required: false,
                    },
                ],
            });
            return respMapper(200, grades);
        } catch (error) {
            if (error.stack) {
                console.log(error.message);
                console.log(error.stack);
            }
            throw errorResp(400, error.message);
        }
    },
};
