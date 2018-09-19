/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const multer                  = require('multer'),
//Internal Module
      error                   = require('./error'),
      response                = require('./response'),
      donateBlock             = require('./donateBlock');

module.exports  =  app => {



  app.post('/v1/registerUser', donateBlock.apiInfo, donateBlock.registerUser, response, error);

  /**
  * POST: /v1/login
  * DESC: Api for login
  * 
  * Sample Request Params:
  * {
  *   "isd_code": "91"
  *  	"phone": "9456865857",
  *   "password": "sd37g7ghsaug983"
  * }
  * 
  * Sample Response:
  * {
  *     "status": true,
  *     "message": {
  *         "auth": true,
  *         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4Yl9pZCI6IjViMzVjNGQ5YjRjNTRhOThhYWM3ZWU1ZCIsInRpbWUiOjE1MzI5NDEzNjAzMTgsImlhdCI6MTUzMjk0MTM2MH0.dFx7FIBSWp06MN2ctJdLw_iVZEGT2hfDUpTVezwGIwY",
  *         "db_id": "5b35c4d9b4c54a98aac7ee5d"
  *     },
  *     "statusCode": 200
  * }
  *  
  */
  app.post('/v1/login', donateBlock.apiInfo, donateBlock.checkLogin, response, error);



	/**
  * GET: /v1/userDetails?db_id=5b35c4d9b4c54a98aac7ee5d
  * DESC: Api for getting user data
  * 
  * Sample Response:
  * {
  *     "status": true,
  *     "message": {
  *         "_id": "5b35c4d9b4c54a98aac7ee5d",
  *         "name": "Mayank Sahai",
  *         "email": "mayank@newgen.com",
  *         "address": "2 basant vihar agra",
  *         "gender": "Male",
  *         "date_of_birth": "2018-06-26T04:57:11.000Z",
  *         "password": "sd37g7ghsaug983",
  *         "profile_pic": "facebook.com/mayank",
  *     },
  *     "statusCode": 200
  * }
  * 
  */
  app.get('/v1/getUserDetails', donateBlock.apiInfo, donateBlock.verifyToken, donateBlock.getUserDetails, response, error);


  /** 
  * PUT: /v1/updateUserDetails
  * DESC: Api for updat user details
  * 
  * Sample Request to be added in form-data:
  * {
  *   "db_id": 5b35c4d9b4c54a98aac7ee5d
  *   
  * }
  * 
  * Sample Response:
  * {    "status": true,
  *     "message": {
  *         "profile_updated": true
  *     },
  *     "statusCode": 200
  * }
  * 
  */
  app.put('/v1/updateUserDetails', donateBlock.apiInfo, donateBlock.verifyToken, donateBlock.updateUserDetails, response, error);

/**
  * GET: /v1/userDetails?xb_id=5b35c4d9b4c54a98aac7ee5d
  * DESC: Api for getting user data
  * 
  * Sample Response:
  * {
  *     "status": true,
  *     "message": {
  *             "$class": "donateBlock.donateBlockUser",
  *             "xb_id": "5b97763e9fa4c45e39d4e369",
  *             "public_key": "44a8sf48as4sf84as8f48fafa4sf8as4f",
  *             "first_name": "Bruce",
  *             "middle_name": "go",
  *             "last_name": "Wayne",
  *             "email": "batman@gmail.com",
  *             "phone": "9999900000",
  *             "gender": "M",
  *             "date_of_birth": "02/08/1895",
  *             "place_of_birth": "Gotham",
  *             "password": "12345",
  *             "street": "Gotham",
  *             "address1": " Gotham",
  *             "address2": "Gotham",
  *             "city": "Gotham",
  *             "state": "Gotham",
  *             "country": "USA",
  *             "zip": "201478",
  *             "kyc_level": 1,
  *             "profile_pic": "",
  *             "status": "REGISTERED",
  *             "friends": [],
  *             "posts": [],
  *             "bio": "",
  *             "education_details": "",
  *             "occupation_details": "",
  *             "relationship": "",
  *             "frd_status": 0,
  *             "friend_req_msg": ""
  *     },
  *     "statusCode": 200
  * }
  * 
  */
 app.get('/v1/getDetailsById', donateBlock.apiInfo, donateBlock.verifyToken, donateBlock.getDetailsById, response, error);


 /**
  * POST: /v1/profilePicUpload
  * DESC: Api for uploading profile picture
  * 
  * Sample Request to be added in form-data:
  * {
  *  	"profile_pic": File for profile pic,
  * 	"donateBlock_id": 5b35c4d9b4c54a98aac7ee5d
  * }
  * 
  * Sample Response:
  * {
  *     "status": true,
  *     "message": {
  *         "file_uploaded: true
  *     },
  *     "statusCode": 200
  * }
  * 
  */
 app.post('/v1/profilePicUpload', donateBlock.apiInfo, donateBlock.verifyToken, donateBlock.profilePicUpload,response,error);

};
