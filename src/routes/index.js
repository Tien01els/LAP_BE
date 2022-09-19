const roleRouter = require('./role');

const route = (app) => {
    app.use('/role', roleRouter);
};

module.exports = route;
