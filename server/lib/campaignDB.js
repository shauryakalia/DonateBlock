/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Modules
const mongoose          = require('mongoose'),
      Q                 = require('q'),
      _                 = require('lodash'),
      async             = require("async"),
//Internal Modules
      Campaign          = require('../model/Campaign'),
      util              = require('../util'),
      config            = require('../config');


module.exports = {

  createCampaign: async (new_details) => {

    let campaign  = new Campaign(new_details);

    let queryRes  = await campaign.save();
    return queryRes;
  },

  
  //user
  getAllCampaign: async () => {
    
    let queryRes = await Campaign.find({});
    return queryRes;
  },


  //organisation
  getSelfCampaign: async (org_id) => {

    let queryRes = await Campaign.find({campaignOrganisation: org_id});
    return queryRes;
    
    l
  }

};
