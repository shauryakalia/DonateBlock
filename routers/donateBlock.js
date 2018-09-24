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
      DB                  =   lib.DB,
      service             =   lib.service,
      LOG                 =   config.LOG,
      util                =   require('../util'),
      appConst            =   util.appConst,
      errorCode           =   util.errorCode,
      REQUEST             =   config.REQUEST;

module.exports  = {

  apiInfo: (req, res, next) => {

    const body                  =   _.get(req, 'body', {}),
          method                =   _.get(req, 'method', ''),
          query                 =   _.get(req, 'query', {}),
          url                   =   _.get(req, 'url', '');

    LOG.console.info(method + ": " + url);
    LOG.console.info("Params: ".info, JSON.stringify((method === "POST" || method === "PUT") ? body : query).info);

    return next();

  },

};