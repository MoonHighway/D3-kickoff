var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('static-favicon');
var routes = require('./routes');
var cors = require('cors');
var app = express();
app.use(favicon());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

/**
* Adds our own JSON middleware for CORS
*   Only ads CORS to JSON Requests
*   Appends boolean ajax to the request object
*/
app.use(function(req, res, next) {

    res.header('Content-Type', 'text/plain')
        .header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .header('Access-Control-Allow-Origin', '*');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }

});

app.use(express.static(path.join(__dirname, 'data')));

app.use('/', routes);

app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

if (app.get('env') === 'development') {
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});
}

app.use(function(err, req, res, next) {
res.status(err.status || 500);
res.render('error', {
    message: err.message,
    error: {}
});
});


app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
console.log('D3 Data Server listening on port ' + server.address().port);
});
