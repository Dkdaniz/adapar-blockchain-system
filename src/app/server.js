const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('../config');
const logMorgan = require('../lib/morgan');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan((info, req, res) => logMorgan(info, req, res)));

const Auth = require('./middleware/auth');

const SessionController = require('./controllers/SessionController');

SessionController(app);

app.use(Auth);
app.listen(config.port, () => console.log(`Api on port ${config.port}!`));
