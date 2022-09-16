const rolesRouter = require('./roles');

const route = (app) => {
    app.use('/roles', rolesRouter);
};

module.exports = route;
