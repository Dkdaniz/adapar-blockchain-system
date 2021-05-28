const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerDocument = require('../../swagger.json');

const config = require('../config');
const logMorgan = require('../lib/morgan');

const app = express();

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(morgan((info, req, res) => logMorgan(info, req, res)));

const Auth = require('./middleware/auth');

const SessionController = require('./controllers/SessionController');
const StatusController = require('./controllers/StatusController');
const StateController = require('./controllers/StateController');
const PrincipesActifsController = require('./controllers/PrincipesActifsController');
const PharmacologicClassController = require('./controllers/PharmacologicClassController');
const CeCategoryController = require('./controllers/CeCategoryController');
const OieClassificationController = require('./controllers/OieClassificationController');
const OmsClassificationController = require('./controllers/OmsClassificationController');
const UserPositionController = require('./controllers/UserPositionController');
const UcController = require('./controllers/UcController');
const AssignedCeController = require('./controllers/AssignedCeController');
const CommercialEstablishmentsController = require('./controllers/CommercialEstablishmentsController');
const ManufacturersController = require('./controllers/ManufacturersController');
const ProductController = require('./controllers/ProductController');
const StockProductController = require('./controllers/StockProductController');
const UlsaController = require('./controllers/UlsaController');

SessionController(app);
StatusController(app);
StateController(app);
PrincipesActifsController(app);
PharmacologicClassController(app);
CeCategoryController(app);
OieClassificationController(app);
OmsClassificationController(app);
UserPositionController(app);
UcController(app);
AssignedCeController(app);
CommercialEstablishmentsController(app);
ManufacturersController(app);
ProductController(app);
StockProductController(app);
UlsaController(app);

app.use(Auth);
app.listen(config.port, () => console.log(`Api on port ${config.port}!`));
