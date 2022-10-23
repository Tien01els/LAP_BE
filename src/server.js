const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/connectDB');
const route = require('./routes/index');

let app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`${app.name} listening to ${port}`);
});

route(app);
