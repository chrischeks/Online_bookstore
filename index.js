'use strict';

var express = require('express');
var kraken = require('kraken-js');
var flash = require('connect-flash');
var db = require('./lib/db');
var cookieParser = require('cookie-parser');
var session = require ('express-session');
var app = express();

var options;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        db.config(config.get('dataBaseConfig'));
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));
app.use(cookieParser('keyboard cat'));
// app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
