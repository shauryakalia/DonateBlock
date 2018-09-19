/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const _                 = require('lodash'),
//Internal Module
      config            = require('../config'),
      LOG               = config.LOG;

module.exports = (req, res) => {

  let resError = {
    status: false,
    statusCode: _.get(req, ['error', 'statusCode'], 509),
    error: _.get(req, ['error'], {})
  };

  return res.status(_.get(req, ['error', 'statusCode'], 509)).send(resError);

};
