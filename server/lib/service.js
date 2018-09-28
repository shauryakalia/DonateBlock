/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Modules
const _                   =   require('lodash'),
      multer              =   require('multer');

module.exports = {
  
  upload    :  multer({storage: multer.diskStorage({

    destination: (req, file, cb) => {
  
      cb(null,'./public/images/uploads/');
  
    },
    filename: (req, file, cb) => {
  
      cb(null, file.originalname);
  
    }
  
  })
  }).single('profile_pic'),
};