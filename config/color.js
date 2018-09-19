/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

// NPM Modules
const colors                = require('colors');

colors.setTheme({
  silly:                    'rainbow',
  input:                    'grey',
  verbose:                  'cyan',
  prompt:                   'grey',
  info:                     'green',
  data:                     'grey',
  help:                     'cyan',
  warn:                     'yellow',
  debug:                    'blue',
  error:                    'red'
});

module.exports = colors;
