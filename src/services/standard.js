const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findAllStandards: async () => {
        try {
            let standards = await db.Standard.findAll({
                where: { isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, standards);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },
};
