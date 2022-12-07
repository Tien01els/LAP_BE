const express = require('express');
const { classAssignmentController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const classAssignmentRouter = express.Router();

classAssignmentRouter.get(
    '/class/:classId',
    verifyToken,
    classAssignmentController.getAssignmentOfClass
);
classAssignmentRouter.post(
    '/',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    classAssignmentController.postClassAssignment
);
classAssignmentRouter.put(
    '/class/:classId/assignment/:assignmentId',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    classAssignmentController.updateDueDateOfClassAssignment
);
classAssignmentRouter.delete(
    '/:id',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    classAssignmentController.deleteClassAssignment
);

module.exports = classAssignmentRouter;
