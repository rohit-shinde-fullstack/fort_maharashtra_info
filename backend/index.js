let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require("swagger-ui-express");

let app = express();

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb',
    parameterLimit: 1000000
}));

app.use(bodyParser.json(
    {   limit: '500mb' ,
        verify: (req, res, buf) => {
            req.rawBody = buf.toString();
        }
    }
));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb',
    parameterLimit: 1000000
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/templates', express.static(path.join(__dirname, 'templates')));



var indexRouter = require('./routes/index');
app.use('/api', indexRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.status(500).send({ message: "something went wrong" });
});
module.exports = app;