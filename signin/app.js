var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var debug = require('debug')('signin:app');


module.exports = function (db) {
    var indexRouter = require('./routes/index')(db);
    var app = express();
// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(session({
        store: new FileStore(),
        resave: false,
        saveUninitialized: false,
        secret: 'modern web programing'
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);

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

    return app;
};
