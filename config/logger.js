/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const simpleNodeLogger = require('simple-node-logger');

const loggerOpts = {
  logFilePath: 'logger/server.log',
  timestampFormat: 'DD-MM-YYYY HH:mm:ss.SSS'
};

const log = {
  file: simpleNodeLogger.createSimpleFileLogger(loggerOpts),
  console: simpleNodeLogger.createSimpleLogger(loggerOpts)
};

module.exports = log;