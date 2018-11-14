/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

// NPM Modules
const _ = require('lodash'),
  // Internal Modules
  config = require('../config'),
  lib = require('../lib'),
  DB = lib.DB,
  vendorDB = lib.vendorDB,
  campaignDB = lib.campaignDB,
  service = lib.service,
  LOG = config.LOG,
  util = require('../util'),
  appConst = util.appConst,
  errorCode = util.errorCode,
  REQUEST = config.REQUEST;

module.exports = {

  apiInfo: (req, res, next) => {

    const body = _.get(req, 'body', {}),
      method = _.get(req, 'method', ''),
      query = _.get(req, 'query', {}),
      url = _.get(req, 'url', '');

    LOG.console.info(method + ": " + url);
    LOG.console.info("Params: ".info, JSON.stringify((method === "POST" || method === "PUT") ? body : query).info);

    return next();

  },

  selectVendor: async (campaign) => {
    try{
    const campaign_id = campaign._id,
      campaignRequirement = campaign.campaignRequirement,
      quantity = campaign.quantity;

    let vendor = await vendorDB.selectVendor(campaignRequirement, quantity);

    await vendorDB.putConsignment(campaign);

    await campaignDB.addSelectedVendorDetail(vendor._id);
    return true;
    }
    catch(err){
      let selectVendorError = {
        status: true,
        error: _.get(errorCode, 648, ''),
        statusCode: 648
      };

      LOG.console.info("ERROR : " + selectVendorError.error); //Adding error in the log file
      _.set(req, ['error'], selectVendorError);
      return next();
    }
  }

};