const db = require('../models/index');
const { respMapper, errorResp } = require('../helper/helper');

module.exports = {
    findStudentsbyClassId: async (classId) => {
        try {
            let students = await db.Student.findAll({
                where: { classId, isDeleted: 0 },
                attributes: {
                    exclude: ['isDeleted', 'createdAt', 'updatedAt'],
                },
                raw: true,
            });
            return respMapper(200, students);
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },

    createStudent: async (student) => {
        try {
            await db.Student.create(student);
            return respMapper(201, 'Successfully created student');
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },

    addStudentToClass: async (classId, studentEmail) => {
        try {
            if (!studentEmail)
                return respMapper(422, { text: 'No ok', message: 'Please enter a email' });

            let account = await db.Account.findOne({
                where: { email: studentEmail, roleId: 3, isActive: true, isDeleted: false },
            });

            if (!account) {
                console.log('Not found account of student');
                return respMapper(422, { text: 'No ok', message: 'Account of student not found' });
            }

            const student = await db.Student.findOne({
                where: { accountId: account?.id, isDeleted: 0 },
            });
            if (student?.classId)
                return respMapper(409, { text: 'No ok', message: 'Student had class' });
            student.classId = classId;
            await student.save();
            return respMapper(201, {
                text: 'Ok',
                message: 'Add student into class successfully',
            });
        } catch (error) {
            if (error.stack) console.log(error.stack);
            throw errorResp(400, error.message);
        }
    },

    removeStudentFromClass: async (studentId) => {
        try {
            await db.Student.update({ classId: null }, { where: { id: studentId } });
            return respMapper(204, 'Successfully deleted student');
        } catch (e) {
            console.error('Can not remove student from class');
            console.error(e.message);
            console.error(e.stack);
            throw errorResp(400, error.message);
        }
    },
};
