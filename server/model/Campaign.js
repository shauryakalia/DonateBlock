/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const mongoose = require('mongoose'),
  //Internal Modules
  DB = require('../config/dbconnection');


var campaignSchema = mongoose.Schema({
  campaignName: { type: String },
  campaignCause: { type: String },
  campaignOrganisation: { type: String },
  campaignDiscription: { type: String },
  campaignRequirement: { type: String, enum: ["clothes", "books", "food"] },
  quantity: { type: Number, default: 0 },
  amount_raised: { type: Number, default: 0 },
  amount_required: { type: Number },
  status: { type: Boolean, default: true },
  deliverable: { type: Boolean, default: false },
  selectedVendorDetail: {
    vendorId: { type: String },
    consignment_sent: { type: Boolean }
  }
});

campaignSchema.index({ campaignName: 'text' });//,{weights: {first_name: 3, last_name: 2, middle_name: 1}});

module.exports = mongoose.model('Campaign', campaignSchema);