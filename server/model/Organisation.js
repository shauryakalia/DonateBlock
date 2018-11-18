/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const	mongoose 						= require('mongoose'),
//Internal Modules
		DB 								= require('../config/dbconnection');


var organisationSchema = mongoose.Schema({
	orgName         :   { type: String },
  orgPhone        :   { type: String },
  orgEmail        :   { type: String },
  isd_code        :   { type: String },
  orgPassword     : { type: String },
  orgRegId        :   { type: String },
  orgAddress      :  { type: String },
  orgOwnerName    :   { type: String },
  token           :   { type: String },
  orgWalletAddress: { type: String}
}
);

organisationSchema.index({orgName:'text'});//,{weights: {first_name: 3, last_name: 2, middle_name: 1}});

module.exports = mongoose.model('Organisation', organisationSchema);