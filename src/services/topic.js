<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
=======
<<<<<<< Updated upstream
=======
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
const sequelize = require('sequelize');
const db = require('../models/index');

module.exports = {
    createTopic: async (topic) => {
        try {
            let result = await db.Topic.create(topic);
            return result;
        } catch (e) {
            console.log(e);
        }
    },
    getTopicByTeacherIdAndGradeId: async (teacherId, gradeId) => {
        try {
            let result = await db.Topic.findAll(
                {
<<<<<<< HEAD
<<<<<<< HEAD
                    where: { teacherId, gradeId },
=======
                    where: { teacherId, gradeId, isDeleted: 0 },
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
=======
                    where: { teacherId, gradeId, isDeleted: 0 },
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
                    raw: true,
                    nest: true,
                    duplicate: false,
                },
                { timestamps: false }
            );
<<<<<<< HEAD
<<<<<<< HEAD
            console.log(result);
=======
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
=======
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
            return result;
        } catch (e) {
            console.log(e);
        }
    },
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
=======
>>>>>>> Stashed changes
>>>>>>> 770d873c030ecb35de5ae6180c926406eb82ba1d
