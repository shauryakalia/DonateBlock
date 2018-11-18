/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const	mongoose 						= require('mongoose'),
//Internal Modules
		DB 								= require('../config/dbconnection');


var userSchema = mongoose.Schema({
	first_name: { type: String },
	last_name: { type: String },
	password: { type: String },
	phone : { type: String },
	email : { type: String},
	profile_pic: { type: String },
	token: { type: String },
	isd_code: {type: String},
	gender: { type: Number },
	date_of_birth: { type: String },
	address: {
		street            :   { type: String },
		address           :   { type: String },
		city              :   { type: String },
		state             :   { type: String },
		country           :   { type: String },
		zip               :   { type: String }
	},
	campaign : [{
		campaignID: {type: String},
		amount: {type: Number }
	}]
}
);

userSchema.index({first_name:'text', last_name:'text'});//,{weights: {first_name: 3, last_name: 2, middle_name: 1}});

module.exports = mongoose.model('User', userSchema);
