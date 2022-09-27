const db = require('../models/index');

module.exports = {
    findAllGrades: async () => {
        try {
            let grades = await db.Grade.findAll({
<<<<<<< HEAD
=======
                where: { isDeleted: 0 },
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
                raw: true,
            });
            return grades;
        } catch (e) {
            console.log(e);
        }
    },
};
