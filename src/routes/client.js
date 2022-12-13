const express = require('express');
const path = require('path');

const clientRouter = express.Router();

clientRouter.get('/*', (req, res) => {
    return res.sendFile('/index.html', {
        root: path.join(__dirname, '../../build'),
    });
});

module.exports = clientRouter;
