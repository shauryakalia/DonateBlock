/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//Internal Modules
const LOG       = require('./logger'),
      DB        = require('./dbconnection'),
      colors    = require('./color'),
      wallet    = require('./wallet');  

module.exports = {

    LOG: LOG,
    DB: DB,
    colors: colors,
    wallet: wallet

};
