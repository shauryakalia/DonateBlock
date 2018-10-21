/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Modules
const mongoose          = require('mongoose'),
      Q                 = require('q'),
      _                 = require('lodash'),
      async             = require("async"),
//Internal Modules
      User              = require('../model/User'),
      util              = require('../util'),
      config            = require('../config');


module.exports = {

  checkMobile: async (phone) => {
    
    let queryRes = await User.findOne({ "phone": phone});
    return queryRes;
  },

  checkLogin: async (phone, password) => {

      let queryRes = await User.find({ "phone": phone , "password": password }).lean();
      return queryRes[0];
  },


  registerUser: async (new_details) => {

      let user  = new User(new_details);

      let queryRes  = await user.save();
      return queryRes;
  },


  addTokenForVerifiedUser: async (db_id, jwt_token) => {

      let queryRes = await User.update({_id : db_id}, { $set: { token: jwt_token}});
      return queryRes;
  },

  userDetails: async (db_id) => {

      let queryRes = await User.findById( db_id ).lean();
      return queryRes;
  },


  changePassword: async (db_id, new_password) =>  {

    let queryRes = await User.update({ _id : db_id}, { $set : { password: new_password}  });
    return queryRes;
  },


  updateUserDetails: async (db_id, new_details) => {

      let queryRes = await User.update({_id : db_id}, { $set : {new_details}});
      return queryRes;
  },

  //Add profile pic path
  addProfilePath: async (db_id, path) =>  {

    // let path  = './public/images/uploads/'+db_id;
      let queryRes  = await User.update({_id: db_id}, { $set: { profile_pic: path}});
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
