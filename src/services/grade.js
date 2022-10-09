const db = require('../models/index');

module.exports = {
    findAllGrades: async () => {
        try {
            let grades = await db.Grade.findAll({
                where: { isDeleted: 0 },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true,
            });
            return grades;
        } catch (e) {
            console.log(e);
        }
    },
};
