require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');

const connectDB = require('./src/config/connectDB');
const { notificationSocketController } = require('./src/controllers/index');
const route = require('./src/routes/index');

let app = express();

app.use(cors());
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use(cors({ credentials: true, origin: 'http://localhost:3050' }));
app.use(express.static('build'));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    },
});
global._io = io;
global._io.on('connection', (socket) => {
    notificationSocketController.connection(socket);
});

let port = process.env.PORT || 8080;
httpServer.listen(port, () => {
    console.log(`${app.name} listening to ${port}`);
});
route(app);
