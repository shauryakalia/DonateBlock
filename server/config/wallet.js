/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Modules
const ethers = require('ethers');
let provider = ethers.getDefaultProvider('ropsten');
let generate = () => {

  let randomWallet = ethers.Wallet.createRandom();
let walletWithProvider = new ethers.Wallet(randomWallet.privateKey, provider);
console.log("wallet with provider --- ",walletWithProvider);
return walletWithProvider;
}





module.exports = {
  generate : generate 
};
