/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

/*
* All the utils will be exposed from here
* Util will include
* Application constants
*/

const appConst            = require('./appConst'),
      errorCode           = require('./errorCode');

module.exports = {

  appConst: appConst,
  errorCode : errorCode

};
