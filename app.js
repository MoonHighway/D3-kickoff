var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'class-files')));

module.exports = app;
