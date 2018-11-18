/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const mongoose = require('mongoose'),
  //Internal Modules
  DB = require('../config/dbconnection');


var vendorSchema = mongoose.Schema({
  vendorName: { type: String },
  vendorPhone: { type: String },
  vendorEmail: { type: String },
  vendorRegId: { type: String },
  vendorWalletAddress: { type: String},
  isd_code: { type: String },
  vendorPassword: { type: String },
  vendorAddress: { type: String },
  token: { type: String },
  inventory: [
    {
      item: {type: String, default: "clothes"}, 
      quantity: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    },
   {
      item: {type: String, default: "books"} ,
      quantity: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    },
    {
      item: {type: String, default: "food"} ,
      quantity: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    }
  ],
  consignment: [{
    campaign_data: { type: Object },
    sent: { type: Boolean }
  }]
});

vendorSchema.index({ vendorName: 'text' });//,{weights: {first_name: 3, last_name: 2, middle_name: 1}});

module.exports = mongoose.model('Vendor', vendorSchema);