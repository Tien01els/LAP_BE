const db = require('../models/index');

module.exports = {
    findTopicsByClassId: async (classId) => {
        try {
            let topics = await db.Class_Topic.findAll({
                where: { classId: classId, isDeleted: 0 },
                raw: true,
            });
            return topics;
        } catch (e) {
            console.log(e);
        }
    },
};
