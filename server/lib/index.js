/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//Internal Modules
const userDB      = require('./userDB'),
      organisationDB  = require('./organisationDB'),
      service = require('./service');

module.exports = {

  userDB:         userDB,
  service:        service,
  organisationDB: organisationDB

};