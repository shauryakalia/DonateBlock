/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const _             =     require('lodash'),
//Internal Module
      config        =     require('../config'),
      LOG           =     config.LOG;

module.exports = (req, res, next) => {

  if (_.get(req, ['error', 'status'], false)) {

    return next();
        
  }

  let finalResponse =     {
    status: true,
    message: _.get(req, ['body'], {}),
    statusCode: 200
  };

  return res.status(200).send(finalResponse);

};
