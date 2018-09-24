/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

// NPM Modules
const _                   =   require('lodash'),
      multer              =   require('multer'),
      request             =   require('request'),
      jwt                 =   require('jsonwebtoken'),
// Internal Modules
      config              =   require('../config'),
      lib                 =   require('../lib'),
      util                =   require('../util'),
      organisationDB      =   lib.organisationDB,
      service             =   lib.service,
      LOG                 =   config.LOG,
      appConst            =   util.appConst,
      errorCode           =   util.errorCode,
      REQUEST             =   config.REQUEST;

module.exports  = {

  registerOrganisation: async (req, res, next) => {

    try{

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const db_details = {
        orgName        :   _.get(req,['body','orgName'],''),
        orgEmail       :   _.get(req,['body','orgEmail'],''),
        orgPhone       :   _.get(req,['body','orgPhone'],''),
        isd_code       :   _.get(req,['body','isd_code'],''),
        orgPassword    : /*service.encrypt(*/_.get(req, ['body', 'orgPassword'], '')/*)*/,
        orgRegId       :   _.get(req,['body','orgRegId'],''),
        orgAddress     :   _.get(req,['body','orgAddress'],''),
        orgOwnerName   :   _.get(req,['body','orgOwnerName'],'')
      };

      if(!db_details.orgName || !db_details.orgPhone || !db_details.orgPassword  || !db_details.orgRegId){
        
        let invalidDetailError = {
          status: true,
          error: _.get(errorCode, 601, ''),
          statusCode: 601
        };

        LOG.console.info("ERROR : " + invalidDetailError.error); //Adding error in the log file
        _.set(req, 'error', invalidDetailError);
        return next();
      }

    
      let details  = await organisationDB.registerOrganisation(db_details);//Adding a new verified Organisation in organisationDB

      if(!details)
      {          // error: "Error in adding new verified Organisation to the db",
        let invalidOrganisationError = {
          status: true,
          error: _.get(errorCode, 628, ''),
          statusCode: 628
        };

        LOG.console.info("ERROR : " + invalidOrganisationError.error); //Adding error in the log file
        _.set(req, 'error', invalidOrganisationError);
        return next();

      }

      _.set(req, ['body'], {});
      _.set(req, ['body'], details);
     
      return next();

    }
    catch(error) {
        // error:"organisationDB Error" ,
      let hlError =   {
        status: true,
        error: _.get(errorCode, 603, ''),
        statusCode: 603
      };

      _.set(req, ['error'], hlError);
      return next();

    }
  },


  checkOrganisationLogin: async (req, res, next) => {

    try {

      if ( _.get(req, ['error', 'status'], false) ) {

        return next();
      }

      const phone                 = _.get(req, ['body', 'phone'], 0),
            isd_code              = _.get(req, ['body', 'isd_code'], 0),
            password              = _.get(req, ['body', 'password'], '');

      if(!phone || !password || !isd_code)//phone, password and isd code are compulsory
      {
        let organisationError = {
          status: true,
          error: _.get(errorCode, 604, ''),
          statusCode: 604

        };

        LOG.console.info("ERROR : " + organisationError.error); //Adding error in the log file
        _.set(req, ['error'], organisationError);
        return next();
      }

    //Checking the Organisation in db, based on the credentials
      let details = await organisationDB.checkLogin( phone , password );

      if (!details)
      {
        // error: 'Invalid credentials'
        let dbError = {
          status: true,
          error: _.get(errorCode, 605, ''),
          statusCode: 605
        };

        LOG.console.info("ERROR : " + dbError.error); //Adding error in the log file
        _.set(req, ['error'], dbError);
        return next();

      }
      
      if(details.isd_code != isd_code){

        // error: 'Invalid isd_code'
        let dbError = {
          status: true,
          error: _.get(errorCode, 639, ''),
          statusCode: 639
        };

        LOG.console.info("ERROR : " + dbError.error); //Adding error in the log file
        _.set(req, ['error'], dbError);
        return next();

      }

      let token = await jwt.sign({ db_id: details._id, time: new Date().getTime() }, appConst.secret_key);//generating token

      let updatedDetails = await organisationDB.addTokenForVerifiedOrganisation( details._id, token);//adding session token for the Organisation in db

      if (!updatedDetails)
      {
        // error: "Error while adding session token in db"
        let dbError = {
          status: true,
          error: _.get(errorCode, 629, ''),
          statusCode: 629
        };

        LOG.console.info("ERROR : " + dbError.error); //Adding error in the log file
        _.set(req, ['error'], dbError);
        return next();

      }

      _.set(req, ['body'], {});
      _.set(req, ['body', 'auth'], true);
      _.set(req, ['body', 'access_token'], token);
      _.set(req, ['body', 'db_id'], details._id);
      _.set(req, ['body', 'first_name'], details.first_name);
      _.set(req, ['body', 'last_name'], details.last_name);

      return next();

    } catch (error) {

      console.log('error',error);
      let hlError =   {
        status: true,
        error: _.get(errorCode, 641, ''),
        statusCode: 641
      };

      LOG.console.info("ERROR : " + hlError.error); //Adding error in the log file
      _.set(req, ['error'], hlError);
      return next();

    }

  },


//--------------------api to verify the session token---------------
  verifyOrganisationToken: async (req, res, next) => {

    if(_.get(req, ['error', 'status'], false) ){

      return next();
    }

    try{

      let token = req.headers['x-access-token'];

      if(!token)
      {
        // error: 'Token missing!',
        let tokenError = {
          status: true,
          error: _.get(errorCode, 606, ''),
          statusCode: 606
        };

        LOG.console.info("ERROR : " + tokenError.error); //Adding error in the log file
        _.set(req, ['error'], tokenError);
        return next();

      }

      let decodedId = await jwt.verify(token, appConst.secret_key);//verifying the session token

      let details = await organisationDB.organisationDetails( decodedId.db_id );//Getting Organisation details based on id from db

      if(!details)
      {
        // "Error in getting Organisation details from the db" ,
        let organisationError = {
          status: true,
          error: _.get(errorCode, 608, ''),
          statusCode: 608
        };

        LOG.console.info("ERROR : " + organisationError.error); //Adding error in the log file
        _.set(req, ['error'], organisationError);
        return next();

      }

      if(details.token == token)
      {
        _.set(req, ['body','db_id'], decodedId.db_id );//token verified via db
        return next();

      }
      if(!details.token)
      {
        //'Organisation not logged in'
        let organisationError = {
          status: true,
          error: _.get(errorCode, 623, ''),
          statusCode: 623
        };

        LOG.console.info("ERROR : " + organisationError.error); //Adding error in the log file
        _.set(req, ['error'], organisationError);
        return next();

      }

      //'Organisation logged in on another device:Token mismatch'
      let tokenError = {
        status: true,
        error: _.get(errorCode, 607, ''),
        statusCode: 607
      };

      LOG.console.info("ERROR : " + tokenError.error); //Adding error in the log file
      _.set(req, ['error'], tokenError);
      return next();

    }
    catch(error){
      // 'Failed to authenticate token.
      let token_error = {
        status: true,
        error: _.get(errorCode, 609, ''),
        statusCode: 609
      }

      LOG.console.info("ERROR : " + token_error.error); //Adding error in the log file
      _.set(req,['error'], token_error );
      return next();

    }
  },


//--------api to get details of the active Organisation------------------
  getOrganisationDetails: async (req, res, next) => {

    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const db_id  = _.get(req, ['body', 'db_id'], '');
      let organisation_data = await organisationDB.organisationDetails(db_id);
      _.set(req, ['body','organisation_details'], organisation_data );
      return next();

    }
    catch(error)
    {
      // 'Error while getting Organisation details',
      let organisationError = {
        status: true,
        error: _.get(errorCode, 642, ''),
        statusCode: 642
      };

      LOG.console.info("ERROR : " + organisationError.error); //Adding error in the log file
      _.set(req, ['error'], organisationError);
      return next();

    }

  },


//--------api to get Organisation details via db_id------------------
  getDetailsById: async (req, res, next) => {

    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const db_id  = _.get(req, ['body', 'db_id'], '');
      const organisation_id  = _.get(req, ['query', 'organisation_id'], '');

      if(!db_id || !organisation_id)
      {
        // 'id missing!',
        let organisationError = {
          status: true,
          error: _.get(errorCode, 610, ''),
          statusCode: 610
        };

        LOG.console.info("ERROR : " + organisationError.error); //Adding error in the log file
        _.set(req, ['error'], organisationError);
        return next();
      }




      _.set(req, ['body'], {});
      _.set(req, ['body','organisation_details'], getOrganisation_result.result.message[0] );
      _.set(req, ['body','config'], (_.get(appConst, ['config'],'')) );

      return next();

    } catch(error) {
     //Error while getting Organisation details
      let organisationError = {
        status: true,
        error: _. get(errorCode, 642, ''),
        statusCode: 642
      };

      LOG.console.info("ERROR : " + organisationError.result.error.message); //Adding error in the log file
      _.set(req, 'error', organisationError);
      return next();

    }

  },


  //--------api to update Organisation profile------------------
  updateOrganisationDetails: async (req, res, next) => {

    try {

      if(_.get(req,['error', 'status'], false) )
      {
        return next();
      }

      const new_details = {
        bio                  :    _.get(req,['body','bio'],'')
      };

      const db_id            =   _.get(req,['body','db_id'],'');


      let details = await organisationDB.updateOrganisationDetails(db_id,new_details);
      if(details.nModified==0){
        // error: "Error while adding session token in db"
        let dbError = {
          status: true,
          error: _.get(errorCode, 603, ''),
          statusCode: 603
        };

        LOG.console.info("ERROR : " + dbError.error); //Adding error in the log file
        _.set(req, ['error'], dbError);
        return next();
      }
      _.set(req, ['body'], {});
      _.set(req, ['body'], { profile_updated: true});
      return next();

    } catch(error) {

      //"Unable to update Organisation details"
      let updateError = {
        status: true,
        error: _.get(errorCode, 633, ''),
        statusCode: 633
      };

      LOG.console.info("ERROR : " + updateError.error); //Adding error in the log file
      _.set(req, ['error'], updateError);
      return next();

    }

  },


//--------api to upload profile picture------------------
  profilePicUpload: async (req,res,next) => {

    if( _.get(req, ['error', 'status'], false) ){
      return next();
    }

    const db_id = _.get(req, ['body', 'db_id'], '');

    let path  = './public/images/uploads/'+db_id;
    let result  = await organisationDB.addProfilePath(db_id, path);

    if(!result)
    {
      'Error while adding profile pic path in db'
      let picError = {
        status: true,
        error: _.get(errorCode, 632, ''),
        statusCode: 632
    };

       LOG.console.info("ERROR : " + picError.error); //Adding error in the log file
      _.set(req, ['error'], picError);
      return next();

    }

    service.upload(req, res, (err) => {
      if ( err ) {
        //unable to upload pic error
        console.log(err);
        let picError = {
          status: true,
          error: 'error in uploading picture',
          statusCode: 631
        };

        LOG.console.info("ERROR : " + picError.error); //Adding error in the log file
        _.set(req, ['error'], picError);
        return next();
      }
    });

    const new_details = {
          profile_pic       :   path
    };

    _.set(new_details,['db_id'], db_id);

    var details    =    {file_uploaded: true};

    _.set(req, ['body'], {});
    _.set(req, ['body'], details);
    return next();

  },

};