/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Modules
const _                   = require('lodash'),
      bodyParser          = require('body-parser'),
      express             = require('express'),
//Internal modules
      config              = require('./config'),
      router              = require('./routers'),
      util                = require('./util'),
      appConst            = util.appConst,
      LOG                 = config.LOG;


const app                 = express(),
      port                = _.get(appConst, ['port'], 9000);

// parse application/json
app.use(bodyParser.json());

// parse application/urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public/images'));

LOG.console.info('server started at port ', port);

router(app);

app.listen(port);