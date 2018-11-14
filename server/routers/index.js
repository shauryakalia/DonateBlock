/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Module
const multer                  = require('multer'),
//Internal Module
      error                   = require('./error'),
      response                = require('./response'),
      donateBlock             = require('./donateBlock'),
      user                    = require('./user'),
      organisation            = require('./organisation'),
      vendor                  = require('./vendor');

module.exports  =  app => {


  //user--------------------------------------------
  app.post('/v1/registerUser', donateBlock.apiInfo, user.registerUser, response, error);

  app.post('/v1/userLogin', donateBlock.apiInfo, user.checkUserLogin, response, error);

  app.get('/v1/getUserDetails', donateBlock.apiInfo, user.verifyUserToken, user.getUserDetails, response, error);

  app.put('/v1/updateUserDetails', donateBlock.apiInfo, user.verifyUserToken, user.updateUserDetails, response, error);

  app.get('/v1/getUserDetailsById', donateBlock.apiInfo, user.verifyUserToken, user.getDetailsById, response, error);

  app.post('/v1/userProfilePicUpload', donateBlock.apiInfo, user.verifyUserToken, user.profilePicUpload,response,error);

  app.get('/v1/getAllCampaign', donateBlock.apiInfo, user.verifyUserToken, user.getAllCampaign, response, error);
  
  //organisation----------------------------------------
  app.post('/v1/registerOrganisation', donateBlock.apiInfo, organisation.registerOrganisation, response, error);

  app.post('/v1/organisationLogin', donateBlock.apiInfo, organisation.checkOrganisationLogin, response, error);

  app.get('/v1/getOrganisationDetails', donateBlock.apiInfo, organisation.verifyOrganisationToken, organisation.getOrganisationDetails, response, error);

  app.post('/v1/organisationProfilePicUpload', donateBlock.apiInfo, organisation.verifyOrganisationToken, organisation.organisationProfilePicUpload,response,error);

  app.post('/v1/createCampaign', donateBlock.apiInfo, organisation.verifyOrganisationToken, organisation.createCampaign, response, error);

  app.get('/v1/getSelfCampaign', donateBlock.apiInfo, organisation.verifyOrganisationToken, organisation.getSelfCampaign, response, error);
    
  //vendor----------------------------------------
  app.post('/v1/registerVendor', donateBlock.apiInfo, vendor.registerVendor, response, error);

  app.post('/v1/vendorLogin', donateBlock.apiInfo, vendor.checkVendorLogin, response, error);

  app.get('/v1/getVendorDetails', donateBlock.apiInfo, vendor.verifyVendorToken, vendor.getVendorDetails, response, error);

  app.post('/v1/vendorProfilePicUpload', donateBlock.apiInfo, vendor.verifyVendorToken, vendor.vendorProfilePicUpload, response, error);

  app.post('/v1/updateInventory', donateBlock.apiInfo, vendor.verifyVendorToken, vendor.updateInventory, response, error);

  app.get('/v1/getInventory', donateBlock.apiInfo, vendor.verifyVendorToken, vendor.getInventory, response, error);
};
