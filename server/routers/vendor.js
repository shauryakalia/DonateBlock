/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

// NPM Modules
const _                   =   require('lodash'),
      multer              =   require('multer'),
      request             =   require('request'),
      jwt                 =   require('jsonwebtoken'),
// Internal Modules
      config              =   require('../config'),
      lib                 =   require('../lib'),
      util                =   require('../util'),
      vendorDB            =   lib.organisationDB,
      service             =   lib.service,
      LOG                 =   config.LOG,
      appConst            =   util.appConst,
      errorCode           =   util.errorCode,
      REQUEST             =   config.REQUEST;

module.exports  = {



};