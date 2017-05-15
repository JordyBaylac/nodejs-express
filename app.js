var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

//database
var mongodbUri = 'mongodb://localhost:27017/LibraryApp';

// para authentication
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({
        secret: 'i will work in e-builder and i will be software arquitect',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60} //1 minuto!
    }));
require('./src/config/passport/init')(app, mongodbUri); //!> la configuracion de passport se hizo aparte.

// serving static files from public directory
app.use(express.static('public'));

// setting views var
app.set('views', './src/views');

// setting JADE engine
//!> app.set('view engine', 'jade');

// setting Handlebars engine
//!> var handlebars = require('express-handlebars');
//!> app.engine('.hbs', handlebars({extname: '.hbs'}));
//!> app.set('view engine', '.hbs');

// setting EJS engine
app.set('view engine', 'ejs');

//body-parser, para el los parametros por POST
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//! SERVICES

var bookService = require('./src/services/book/bookService.mongodb')(mongodbUri);
var authService = require('./src/services/auth/authService')(mongodbUri);

//! ROUTES

var navigation = [{Link: '/Books', Text: 'Books'}, {Link: '/Authors', Text: 'Authors'}];

var bookRouter = require('./src/routes/booksRouter')(express, bookService, navigation);
var adminRouter = require('./src/routes/adminRouter')(express, mongodbUri);
var authRouter = require('./src/routes/authRouter')(express, authService, mongodbUri);

app.use('/auth', authRouter);
app.use('/Admin', adminRouter);
app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render!',
        nav: navigation
    });
});

app.get('/test', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send('<em>Hiiiii</em>');
});

app.listen(port, function (err) {
    console.log('running server on port:', port);
});