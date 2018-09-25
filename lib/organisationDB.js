/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Modules
const mongoose          = require('mongoose'),
      Q                 = require('q'),
      _                 = require('lodash'),
      async             = require("async"),
//Internal Modules
      Organisation      = require('../model/Organisation'),
      util                = require('../util'),
      config              = require('../config');


module.exports = {

  checkMobile: async (phone) => {
    
    let queryRes = await Organisation.findOne({ "phone": phone});
    return queryRes;
  },

  checkOrganisationLogin: async (orgPhone, orgPassword) => {

      let queryRes = await Organisation.find({ "orgPhone": orgPhone , "orgPassword": orgPassword }).lean();
      return queryRes[0];
  },


  registerOrganisation: async (new_details) => {

      let organisation  = new Organisation(new_details);

      let queryRes  = await organisation.save();
      return queryRes;
  },


  addTokenForVerifiedOrganisation: async (organisation_id, jwt_token) => {

      let queryRes = await Organisation.update({_id : organisation_id}, { $set: { token: jwt_token}});
      return queryRes;
  },

  organisationDetails: async (organisation_id) => {

      let queryRes = await Organisation.findById( organisation_id ).lean();
      return queryRes;
  },


  changePassword: async (db_id, new_password) =>  {

    let queryRes = await Organisation.update({ _id : db_id}, { $set : { password: new_password}  });
    return queryRes;
  },


  updateOrganisationDetails: async (db_id, new_details) => {

      let queryRes = await Organisation.update({_id : db_id}, { $set : {new_details}});
      return queryRes;
  },

  //Add profile pic path
  addProfilePath: async (organisation_id, path) =>  {

    // let path  = './public/images/uploads/'+db_id;
      let queryRes  = await Organisation.update({_id: organisation_id}, { $set: { profile_pic: path}});
      return queryRes;
  },


  //Adding a post
  createPost: async ( post_details ) => {

      //post_details.created = new Date();
      let post = new Post(post_details);

      let queryRes = await post.save();
      return queryRes;

  },


  updatePost: async ( post_id, post_details) =>  {

      let queryRes  = await Post.findByIdAndUpdate({_id:post_id},{$set:{ 'content': post_details.content, 'post_media': post_details.post_media, 'post_format': 0 } });
      return queryRes;

    },


  updateContentOnPost: async (post_id, content) =>  {

      let queryRes  = await Post.findByIdAndUpdate({_id:post_id},{$set:{ 'content': content} });
      return queryRes;

    },


};
