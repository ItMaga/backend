var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql= require('mysql');
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var works = require('./routes/works');
var getWorkById = require('./routes/works');
var changeDataWork = require('./routes/works');
var deleteDataWork = require('./routes/works');
var addWork = require('./routes/works');
var callBack = require('./routes/callback');
var getCallBack = require('./routes/callback');
var selectCallBack = require('./routes/callback');
var clientByEmail = require('./routes/client');
var register = require('./routes/register');
var auth = require('./routes/auth');
var entryNoAuth = require('./routes/entryNoAuth');
var getEntryNoAuth = require('./routes/entryNoAuth');
var changeEntryNoAuth = require('./routes/entryNoAuth');
var clientUpdate = require('./routes/clientUpdate');
var getClientPassword = require('./routes/client');
var resetPassword = require('./routes/client');
var passwordUpdate = require('./routes/clientUpdate');
var addCar = require('./routes/cars');
var getCarByIdClient = require('./routes/cars');
var getCarByIdCar = require('./routes/cars');
var changeDataCar = require('./routes/cars');
var deleteDataCar = require('./routes/cars');
var addEntry = require('./routes/entry');
var getEntry = require('./routes/entry');
var getEntryById = require('./routes/entry');
var changeEntry = require('./routes/entry');
var addContract = require('./routes/contract');
var getContract = require('./routes/contract');
var getContractByIdClient = require('./routes/contract');
var deleteDataContract = require('./routes/contract');
var getContractByIdContract = require('./routes/contract');
var changeDataContract = require('./routes/contract');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  global.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password: '*******',
    database : '********',
  });
  connection.connect();
  next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/works', works);
app.use('/works/add', addWork);
app.use('/works/get_id', getWorkById);
app.use('/works/change', changeDataWork);
app.use('/works/delete', deleteDataWork);
app.use('/callback', callBack);
app.use('/callback/get', getCallBack);
app.use('/callback/change', selectCallBack);
app.use('/register', register);
app.use('/auth', auth);
app.use('/entry_no_auth', entryNoAuth);
app.use('/entry_no_auth/get', getEntryNoAuth);
app.use('/entry_no_auth/change', changeEntryNoAuth);
app.use('/user', clientByEmail);
app.use('/user/pass', getClientPassword);
app.use('/user/reset', resetPassword);
app.use('/users_update', clientUpdate);
app.use('/users_update/pass', passwordUpdate);
app.use('/car', addCar);
app.use('/car/get', getCarByIdClient);
app.use('/car/get_id', getCarByIdCar);
app.use('/car/change', changeDataCar);
app.use('/car/delete', deleteDataCar);
app.use('/entry', addEntry);
app.use('/entry/get', getEntry);
app.use('/entry/get_id', getEntryById);
app.use('/entry/change', changeEntry);
app.use('/contract/add', addContract);
app.use('/contract', getContract);
app.use('/contract/get', getContractByIdContract);
app.use('/contract/get_id', getContractByIdClient);
app.use('/contract/delete', deleteDataContract);
app.use('/contract/change', changeDataContract);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var server = http.createServer(app);
server.listen(4001);

