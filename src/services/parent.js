const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findStudentOfParent: async (parentId) => {
        try {
            let student = await db.Student.findOne({
                where: { parentId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, student);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
