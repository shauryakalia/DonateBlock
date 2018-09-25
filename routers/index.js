/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const multer                  = require('multer'),
//Internal Module
      error                   = require('./error'),
      response                = require('./response'),
      donateBlock             = require('./donateBlock'),
      user                    = require('./user'),
      organisation            = require('./organisation');

module.exports  =  app => {



  app.post('/v1/registerUser', donateBlock.apiInfo, user.registerUser, response, error);

  app.post('/v1/userLogin', donateBlock.apiInfo, user.checkUserLogin, response, error);

  app.get('/v1/getUserDetails', donateBlock.apiInfo, user.verifyUserToken, user.getUserDetails, response, error);

  app.put('/v1/updateUserDetails', donateBlock.apiInfo, user.verifyUserToken, user.updateUserDetails, response, error);

  app.get('/v1/getUserDetailsById', donateBlock.apiInfo, user.verifyUserToken, user.getDetailsById, response, error);

  app.post('/v1/userProfilePicUpload', donateBlock.apiInfo, user.verifyUserToken, user.profilePicUpload,response,error);

  
  //organisation----------------------------------------
  app.post('/v1/registerOrganisation', donateBlock.apiInfo, organisation.registerOrganisation, response, error);

  app.post('/v1/organisationLogin', donateBlock.apiInfo, organisation.checkOrganisationLogin, response, error);

  app.get('/v1/getOrganisationDetails', donateBlock.apiInfo, organisation.verifyOrganisationToken, organisation.getOrganisationDetails, response, error);

  //app.put('/v1/updateOrganisationDetails', donateBlock.apiInfo, organisation.verifyOrganisationToken, organisation.updateOrganisationDetails, response, error);

  // app.get('/v1/getDetailsById', donateBlock.apiInfo, user.verifyUserToken, user.getDetailsById, response, error);

   app.post('/v1/organisationProfilePicUpload', donateBlock.apiInfo, organisation.verifyOrganisationToken, organisation.organisationProfilePicUpload,response,error);

};
