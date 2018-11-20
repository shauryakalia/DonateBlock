/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

const mongoose = require('mongoose'),
    Q = require('q'),
    _ = require('lodash'),
    async = require("async"),
    //Internal Modules
    Vendor = require('../model/Vendor'),
    util = require('../util');

module.exports = {

    checkMobile: async (phone) => {

        let queryRes = await Vendor.findOne({ "phone": phone });
        return queryRes;
    },

    checkVendorLogin: async (vendorPhone, vendorPassword) => {

        let queryRes = await Vendor.find({ "vendorPhone": vendorPhone, "vendorPassword": vendorPassword }).lean();
        return queryRes[0];
    },

    registerVendor: async (new_details) => {

        let vendor = new Vendor(new_details);

        let queryRes = await vendor.save();
        return queryRes;
    },

    addTokenForVerifiedVendor: async (vendor_id, jwt_token) => {

        let queryRes = await Vendor.update({ _id: vendor_id }, { $set: { token: jwt_token } });
        return queryRes;
    },

    vendorDetails: async (vendor_id) => {

        let queryRes = await Vendor.findById(vendor_id).lean();
        return queryRes;
    },

    getUserWallet: async (vendor_id) => {
        let queryRes = await Vendor.findById({_id: vendor_id},{vendorWalletAddress: 1, vendorPrivateKey : 1, vendorPublicKey : 1});
        return queryRes;
    },

    changePassword: async (db_id, new_password) => {

        let queryRes = await Vendor.update({ _id: db_id }, { $set: { password: new_password } });
        return queryRes;
    },

    //Add profile pic path
    addProfilePath: async (vendor_id, path) => {

        // let path  = './public/images/uploads/'+db_id;
        let queryRes = await Vendor.update({ _id: vendor_id }, { $set: { profile_pic: pa0th } });
        return queryRes;
    },

    updateInventory: async (vendor_id, item_data) => {

        let queryRes = await Vendor.update({ _id: vendor_id }, { $set: { inventory: item_data } });
        return queryRes;
    },

    getInventory: async (vendor_id) => {

        let queryRes = await Vendor.find({ _id: vendor_id }, { inventory: 1, _id: 0 });
        return queryRes;
    },

    itemDelivered: async (vendor_id, campaignId)=> {
        let queryRes = await Vendor.update({'_id' :vendor_id, 'consignment.id':campaignId }, {$set: {'consignment.$.sent':true}});
        return queryRes;
    },

    allVendor: async () => {
        let queryRes = await Vendor.find({},{inventory:1,_id:1}).lean();
        return queryRes;
    },

    // selectVendor: async (campaignRequirement, quantity, amount) => {

    //     let queryRes = await Vendor.find({},{});
    //     return queryRes;

    // }
    putConsignment: async (final_vendor, campaign) => {
        let consignment = {
            campaign_id: campaign._id,
            campaign_data: campaign,
            sent: false
        };
        let queryRes = await Vendor.update({_id: final_vendor._id},{$push:{ consignment : consignment}});
        return queryRes;
    }
};