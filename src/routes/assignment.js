const express = require('express');
const { assignmentController } = require('../controllers/index');
const { verifyToken, authRole } = require('../middleware/auth');
const role = require('../config/roleConstant');

const assignmentRouter = express.Router();

assignmentRouter.get(
    '/teacher',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    assignmentController.getAssignmentsOfTeacher
);
assignmentRouter.get(
    '/:id/summary',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    assignmentController.getAssignmentSummary
);

assignmentRouter.get('/:id', verifyToken, assignmentController.getAssignment);

assignmentRouter.post(
    '/',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    assignmentController.postAssignment
);
assignmentRouter.put(
    '/:id',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    assignmentController.putAssignment
);
assignmentRouter.delete(
    '/:id',
    verifyToken,
    authRole(role.ROLE_TEACHER),
    assignmentController.deleteAssignment
);

module.exports = assignmentRouter;
