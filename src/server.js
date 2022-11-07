require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/connectDB');
const route = require('./routes/index');

let app = express();

app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`${app.name} listening to ${port}`);
});

route(app);
