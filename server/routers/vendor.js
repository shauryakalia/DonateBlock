/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

// NPM Modules
const _                   =   require('lodash'),
      multer              =   require('multer'),
      request             =   require('request'),
      jwt                 =   require('jsonwebtoken'),
// Internal Modules
      config              =   require('../config'),
      wallet              =   config.wallet,
      lib                 =   require('../lib'),
      util                =   require('../util'),
      vendorDB            =   lib.vendorDB,
      service             =   lib.service,
      LOG                 =   config.LOG,
      appConst            =   util.appConst,
      errorCode           =   util.errorCode,
      REQUEST             =   config.REQUEST;

module.exports  = {

    registerVendor: async (req, res, next) => {

        try{
    
          if ( _.get(req, ['error', 'status'], false) )
          {
            return next();
          }
    
          let wallet_data = await wallet.generate();

          const db_details = {
            vendorName        :   _.get(req,['body','vendorName'],''),
            vendorEmail       :   _.get(req,['body','vendorEmail'],''),
            vendorPhone       :   _.get(req,['body','vendorPhone'],''),
            isd_code          :   _.get(req,['body','isd_code'],''),
            vendorPassword    : /*service.encrypt(*/_.get(req, ['body', 'vendorPassword'], '')/*)*/,
            vendorRegId       :   _.get(req,['body','vendorRegId'],''),
            vendorAddress     :   _.get(req,['body','vendorAddress'],''),
            vendorWalletAddress     :   wallet_data.address ,
            vendorPrivateKey        :   wallet_data.privateKey,
            vendorPublicKey         :   wallet_data.publicKey,
            inventory         :   
              [
                {
                  id: 1,
                  item: "clothes", 
                  quantity: 0,
                  price: 0,

                },
               {
                id: 2,
                  item: "books",
                  quantity: 0,
                  price: 0,
                },
                {
                  id: 3,
                  item: "food" ,
                  quantity: 0,
                  price: 0,
                }
              ]
          };
    
          if(!db_details.vendorName || !db_details.vendorPhone || !db_details.vendorPassword  || !db_details.vendorRegId){
            
            let invalidDetailError = {
              status: true,
              error: _.get(errorCode, 601, ''),
              statusCode: 601
            };
    
            LOG.console.info("ERROR : " + invalidDetailError.error); //Adding error in the log file
            _.set(req, 'error', invalidDetailError);
            return next();
          }
    
        
          let details  = await vendorDB.registerVendor(db_details);//Adding a new verified Vendor in VendorDB
    
          if(!details)
          {          // error: "Error in adding new verified Vendor to the db",
            let invalidVendorError = {
              status: true,
              error: _.get(errorCode, 628, ''),
              statusCode: 628
            };
    
            LOG.console.info("ERROR : " + invalidVendorError.error); //Adding error in the log file
            _.set(req, 'error', invalidVendorError);
            return next();
    
          }
    
          _.set(req, ['body'], {});
          _.set(req, ['body'], details);
         
          return next();
    
        }
        catch(error) {
            // error:"vendorDB Error" ,
          let hlError =   {
            status: true,
            error: _.get(errorCode, 603, ''),
            statusCode: 603
          };
    
          _.set(req, ['error'], hlError);
          return next();
    
        }
      },

      checkVendorLogin: async (req, res, next) => {

        try {
    
          if ( _.get(req, ['error', 'status'], false) ) {
    
            return next();
          }
    
          const vendorPhone                 = _.get(req, ['body', 'vendorPhone'], 0),
                isd_code                    = _.get(req, ['body', 'isd_code'], 0),
                vendorPassword              = _.get(req, ['body', 'vendorPassword'], '');
    
          if(!vendorPhone || !vendorPassword || !isd_code)//phone, password and isd code are compulsory
          {
            let vendorError = {
              status: true,
              error: _.get(errorCode, 604, ''),
              statusCode: 604
    
            };
    
            LOG.console.info("ERROR : " + vendorError.error); //Adding error in the log file
            _.set(req, ['error'], vendorError);
            return next();
          }
    
        //Checking the Vendor in db, based on the credentials
          let details = await vendorDB.checkVendorLogin( vendorPhone , vendorPassword );
    
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
    
          let token = await jwt.sign({ vendor_id: details._id, time: new Date().getTime() }, appConst.secret_key);//generating token
    
          let updatedDetails = await vendorDB.addTokenForVerifiedVendor( details._id, token);//adding session token for the vendor in db
    
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
          _.set(req, ['body', 'vendor_id'], details._id);
          _.set(req, ['body', 'vendorName'], details.vendorName);
    
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
    verifyVendorToken: async (req, res, next) => {

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

        let details = await vendorDB.vendorDetails( decodedId.vendor_id );//Getting vendor details based on id from db

        if(!details)
        {
            // "Error in getting Vendor details from the db" ,
            let vendorError = {
            status: true,
            error: _.get(errorCode, 608, ''),
            statusCode: 608
            };

            LOG.console.info("ERROR : " + vendorError.error); //Adding error in the log file
            _.set(req, ['error'], vendorError);
            return next();

        }

        if(details.token == token)
        {
            _.set(req, ['body','vendor_id'], decodedId.vendor_id );//token verified via db
            return next();

        }
        if(!details.token)
        {
            //'Vendor not logged in'
            let vendorError = {
            status: true,
            error: _.get(errorCode, 623, ''),
            statusCode: 623
            };

            LOG.console.info("ERROR : " + vendorError.error); //Adding error in the log file
            _.set(req, ['error'], vendorError);
            return next();

        }

        //'Vendor logged in on another device:Token mismatch'
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


//--------api to get details of the active vendor------------------
getVendorDetails: async (req, res, next) => {

    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const vendor_id  = _.get(req, ['body', 'vendor_id'], '');
      let vendor_data = await vendorDB.vendorDetails(vendor_id);
      _.set(req, ['body','vendor_details'], vendor_data );
      return next();

    }
    catch(error)
    {
      // 'Error while getting vendor details',
      let vendorError = {
        status: true,
        error: _.get(errorCode, 651, ''),
        statusCode: 651
      };

      LOG.console.info("ERROR : " + vendorError.error); //Adding error in the log file
      _.set(req, ['error'], vendorError);
      return next();

    }

  },

  
  getVendorWallet: async (req, res, next) => {
    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const vendor_id  = _.get(req, ['body', 'vendor_id'], '');

      if(!vendor_id)
      {
        // 'id missing!',
        let userError = {
          status: true,
          error: _.get(errorCode, 610, ''),
          statusCode: 610
        };

        LOG.console.info("ERROR : " + userError.error); //Adding error in the log file
        _.set(req, ['error'], userError);
        return next();
      }

      let details = await vendorDB.getUserWallet(vendor_id);


      _.set(req, ['body'], {});
      _.set(req, ['body', 'wallet'], details);
     

      return next();

    } catch(error) {
     //Error while getting user details
      let userError = {
        status: true,
        error: _. get(errorCode, 652, ''),
        statusCode: 652
      };

      LOG.console.info("ERROR : " + userError.result.error.message); //Adding error in the log file
      _.set(req, 'error', userError);
      return next();

    }
  },

//--------api to upload profile picture------------------
vendorProfilePicUpload: async (req,res,next) => {

    if( _.get(req, ['error', 'status'], false) ){
      return next();
    }

    const vendor_id = _.get(req, ['body', 'vendor_id'], '');

    let path  = './public/images/uploads/'+vendor_id;
    let result  = await vendorDB.addProfilePath(vendor_id, path);

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

    _.set(new_details,['vendor_id'], vendor_id);

    var details    =    {file_uploaded: true};

    _.set(req, ['body'], {});
    _.set(req, ['body'], details);
    return next();

  },

  //--------api to update Inventory------------------
  updateInventory: async (req, res, next) => {
    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const vendor_id  = _.get(req, ['body', 'vendor_id'], '');
      const item_data = [
        {
          id: 1,
          item: "clothes", 
          quantity: parseInt(req.body.clothesQuantity),
          price: parseFloat(req.body.clothesPrice)

        },
       {
        id: 2,
          item: "books",
          quantity: parseInt(req.body.booksQuantity),
          price: parseFloat(req.body.booksPrice),

        },
        {
          id: 3,
          item:  "food",
          quantity: parseInt(req.body.foodQuantity),
          price: parseFloat(req.body.foodPrice),

        }
      ];
      let vendor_data = await vendorDB.updateInventory(vendor_id, item_data);
      _.set(req, ['body'], {} );
      _.set(req, ['body','updated Inventory'], true );
      return next();

    }
    catch(error)
    {
      // 'Error while getting vendor inventory',
      let vendorError = {
        status: true,
        error: _.get(errorCode, 644, ''),
        statusCode: 644
      };

      LOG.console.info("ERROR : " + vendorError.error); //Adding error in the log file
      _.set(req, ['error'], vendorError);
      return next();

    }
  },

  //--------api to get Inventory------------------
  getInventory: async (req, res, next) => {
    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const vendor_id  = _.get(req, ['body', 'vendor_id'], '');
      let vendor_data = await vendorDB.getInventory(vendor_id);
      _.set(req, ['body'], vendor_data );
      return next();

    }
    catch(error)
    {
      // 'Error while getting vendor inventory',
      let vendorError = {
        status: true,
        error: _.get(errorCode, 645, ''),
        statusCode: 645
      };

      LOG.console.info("ERROR : " + vendorError.error); //Adding error in the log file
      _.set(req, ['error'], vendorError);
      return next();

    }
  },

  itemDelivered: async (req, res, next) => {
    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const vendor_id  = _.get(req, ['body', 'vendor_id'], ''),
            campaignId = _.get(req, ['body','campaign_id'],'');

      let details = await vendorDB.itemDelivered(vendor_id, campaignId);
      if(!details){
        let vendorError = {
          status: true,
          error: _.get(errorCode, 650, ''),
          statusCode: 650
        };
  
        LOG.console.info("ERROR : " + vendorError.error); //Adding error in the log file
        _.set(req, ['error'], vendorError);
        return next();
      }
      _.set(req, ['body', 'sent'], true );
      return next();

    }
    catch(error)
    {
      // 'Error while getting vendor inventory',
      let vendorError = {
        status: true,
        error: _.get(errorCode, 645, ''),
        statusCode: 645
      };

      LOG.console.info("ERROR : " + vendorError.error); //Adding error in the log file
      _.set(req, ['error'], vendorError);
      return next();

    }
  }
};