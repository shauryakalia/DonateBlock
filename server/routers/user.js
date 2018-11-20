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
      userDB              =   lib.userDB,
      campaignDB          =   lib.campaignDB,
      service             =   lib.service,
      LOG                 =   config.LOG,
      util                =   require('../util'),
      appConst            =   util.appConst,
      errorCode           =   util.errorCode,
      REQUEST             =   config.REQUEST;

const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "organization",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "value",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "vendorAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "donors",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "complete",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "payVendor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amountRequired",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "donate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "aim",
				"type": "uint256"
			},
			{
				"name": "org",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
const ethers = require('ethers');
let provider = ethers.getDefaultProvider('rinkeby');
let CampaignFactoryAddress = '0x169FE2EE864770CE7fc11c5EE1642531Ed703F90';

module.exports  = {
  registerUser: async (req, res, next) => {

    try{

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      let wallet_data = await wallet.generate();

      const db_details = {
        first_name        :   _.get(req,['body','first_name'],''),
        last_name         :   _.get(req,['body','last_name'],''),
        phone             :   _.get(req,['body','phone'],''),
        email             :   _.get(req,['body','email'],''),
        isd_code          :   _.get(req,['body','isd_code'],''),
        password          : /*service.encrypt(*/_.get(req, ['body', 'password'], '')/*)*/,
        gender            :   _.get(req,['body','gender'],0),
        date_of_birth     :   _.get(req,['body','date_of_birth'],''),
        address : {
          street            :   _.get(req,['body','street'],''),
          address           :   _.get(req,['body','address1'],''),
          city              :   _.get(req,['body','city'],''),
          state             :   _.get(req,['body','state'],''),
          country           :   _.get(req,['body','country'],''),
          zip               :   _.get(req,['body','zip'],'')
        },
        aadhaar           :     _.get(req,['body','aadhaar'],''),
        walletAddress     :    wallet_data.address ,
        privateKey : wallet_data.privateKey,
        publicKey : wallet_data.publicKey,
      };

      if(!db_details.first_name || !db_details.phone || !db_details.password || !db_details.last_name || !db_details.aadhaar){
        
        let invalidDetailError = {
          status: true,
          error: _.get(errorCode, 601, ''),
          statusCode: 601
        };

        LOG.console.info("ERROR : " + invalidDetailError.error); //Adding error in the log file
        _.set(req, 'error', invalidDetailError);
        return next();
      }

    
      let details  = await userDB.registerUser(db_details);//Adding a new verified user in userDB

      if(!details)
      {          // error: "Error in adding new verified user to the db",
        let invalidUserError = {
          status: true,
          error: _.get(errorCode, 628, ''),
          statusCode: 628
        };

        LOG.console.info("ERROR : " + invalidUserError.error); //Adding error in the log file
        _.set(req, 'error', invalidUserError);
        return next();

      }

      _.set(req, ['body'], {});
      _.set(req, ['body'], details);
     
      return next();

    }
    catch(error) {
        // error:"userDB Error" ,
      let hlError =   {
        status: true,
        error: _.get(errorCode, 603, ''),
        statusCode: 603
      };

      _.set(req, ['error'], hlError);
      return next();

    }
  },
  // donate to cmpaign
  donateToCampaign : async (req,res,next) => {
    try{

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const db_id  = _.get(req, ['body', 'db_id'], '');
      const donation_amount = _.get(req, ['body', 'donation_amount'], '');
      let user_wallet_detail = await userDB.getUserWallet(db_id);
      let user_wallet = new ethers.Wallet(user_wallet_detail.privateKey,provider);
      let contract = new ethers.Contract(CampaignFactoryAddress, abi, provider);
      let contractWithSigner = contract.connect(user_wallet);

      const campaign_id = _.get(req, ['body', 'campaign_id'], '');
      let campaign_wallet_address = await campaignDB.getCampaignWallet(campaign_id);

      let transaction = {
        nonce: 2,
        gasLimit: 3000000,
        gasPrice: ethers.utils.bigNumberify("20000000000"),
        to: campaign_wallet_address.campaignWalletAddress,
        value: ethers.utils.parseEther(donation_amount+'.0'),
        data: "0x",
    
        // This ensures the transaction cannot be replayed on different networks
        chainId: ethers.utils.getNetwork('rinkeby').chainId
    }
    
    let signPromise = user_wallet.sign(transaction).then((signedTransaction) => {

      console.log(signedTransaction);
      let findVendor = provider.sendTransaction(signedTransaction,provider).then((tx) => {
          console.log(tx);
          // {
          //    // These will match the above values (excluded properties are zero)
          //    "nonce", "gasLimit", "gasPrice", "to", "value", "data", "chainId"
          //
          //    // These will now be present
          //    "from", "hash", "r", "s", "v"
          //  }
          // Hash:

          _.set(req, ['body'], {});
          _.set(req, ['body','tx_hash'], tx);
          _.set(req, ['body', 'donation_completed'], true );
          return next();
      }).catch((error) => {
        console.log('error',error);
        let hlError =   {
          status: true,
          error: error,
          statusCode: 680
        };

      LOG.console.info("ERROR : " + hlError.error); //Adding error in the log file
      _.set(req, ['error'], hlError);
      return next();
      });
  });


    }catch(error){
        // error:"userDB Error" ,
        let hlError =   {
          status: true,
          error: _.get(errorCode, 653, ''),
          statusCode: 653
        };
  
        _.set(req, ['error'], hlError);
        return next();
  
    }
  },  


  checkUserLogin: async (req, res, next) => {

    try {

      if ( _.get(req, ['error', 'status'], false) ) {

        return next();
      }

      const phone                 = _.get(req, ['body', 'phone'], 0),
            isd_code              = _.get(req, ['body', 'isd_code'], 0),
            password              = _.get(req, ['body', 'password'], '');

      if(!phone || !password || !isd_code)//phone, password and isd code are compulsory
      {
        let userError = {
          status: true,
          error: _.get(errorCode, 604, ''),
          statusCode: 604

        };

        LOG.console.info("ERROR : " + userError.error); //Adding error in the log file
        _.set(req, ['error'], userError);
        return next();
      }

    //Checking the user in db, based on the credentials
      let details = await userDB.checkLogin( phone , password );

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

      let updatedDetails = await userDB.addTokenForVerifiedUser( details._id, token);//adding session token for the user in db

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
  verifyUserToken: async (req, res, next) => {

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

      let details = await userDB.userDetails( decodedId.db_id );//Getting user details based on id from db

      if(!details)
      {
        // "Error in getting user details from the db" ,
        let userError = {
          status: true,
          error: _.get(errorCode, 608, ''),
          statusCode: 608
        };

        LOG.console.info("ERROR : " + userError.error); //Adding error in the log file
        _.set(req, ['error'], userError);
        return next();

      }

      if(details.token == token)
      {
        _.set(req, ['body','db_id'], decodedId.db_id );//token verified via db
        return next();

      }
      if(!details.token)
      {
        //'User not logged in'
        let userError = {
          status: true,
          error: _.get(errorCode, 623, ''),
          statusCode: 623
        };

        LOG.console.info("ERROR : " + userError.error); //Adding error in the log file
        _.set(req, ['error'], userError);
        return next();

      }

      //'User logged in on another device:Token mismatch'
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


//--------api to get details of the active user------------------
  getUserDetails: async (req, res, next) => {

    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const db_id  = _.get(req, ['body', 'db_id'], '');
      let user_data = await userDB.userDetails(db_id);
      _.set(req, ['body','user_details'], user_data );
      return next();

    }
    catch(error)
    {
      // 'Error while getting user details',
      let userError = {
        status: true,
        error: _.get(errorCode, 642, ''),
        statusCode: 642
      };

      LOG.console.info("ERROR : " + userError.error); //Adding error in the log file
      _.set(req, ['error'], userError);
      return next();

    }

  },


//--------api to get user details via db_id------------------
  getDetailsById: async (req, res, next) => {

    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const db_id  = _.get(req, ['body', 'db_id'], '');
      const user_id  = _.get(req, ['query', 'user_id'], '');

      if(!db_id || !user_id)
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

      let user_data = await userDB.userDetails(user_id);
      _.set(req, ['body'], {});
      _.set(req, ['body','user_details'], user_data );
      return next();


    } catch(error) {
     //Error while getting user details
      let userError = {
        status: true,
        error: _. get(errorCode, 642, ''),
        statusCode: 642
      };

      LOG.console.info("ERROR : " + userError.result.error.message); //Adding error in the log file
      _.set(req, 'error', userError);
      return next();

    }

  },


  //--------api to update user profile------------------
  updateUserDetails: async (req, res, next) => {

    try {

      if(_.get(req,['error', 'status'], false) )
      {
        return next();
      }

      const new_details = {
        bio                  :    _.get(req,['body','bio'],'')
      };

      const db_id            =   _.get(req,['body','db_id'],'');


      let details = await userDB.updateUserDetails(db_id,new_details);
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

      //"Unable to update user details"
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
    let result  = await userDB.addProfilePath(db_id, path);

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

  getAllCampaign: async (req,res,next)=>{

    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const db_id  = _.get(req, ['body', 'db_id'], '');

      if(!db_id)
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

      let details = await campaignDB.getAllCampaign();


      _.set(req, ['body'], {});
      _.set(req, ['body', 'campaign'], details);
     

      return next();

    } catch(error) {
     //Error while getting user details
      let userError = {
        status: true,
        error: _. get(errorCode, 642, ''),
        statusCode: 642
      };

      LOG.console.info("ERROR : " + userError.result.error.message); //Adding error in the log file
      _.set(req, 'error', userError);
      return next();

    }
  },

  getUserWallet: async (req,res,next)=>{
    try {

      if ( _.get(req, ['error', 'status'], false) )
      {
        return next();
      }

      const db_id  = _.get(req, ['body', 'db_id'], '');

      if(!db_id)
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

      let details = await userDB.getUserWallet(db_id);


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
  }

};