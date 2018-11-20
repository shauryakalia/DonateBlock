/*jshint esversion: 6, multistr: true, node: true*/

"use strict";

//NPM Modules
const ethers = require('ethers');
let provider = ethers.getDefaultProvider('rinkeby');

let generate = () => {

  let randomWallet = ethers.Wallet.createRandom();
let walletWithProvider = new ethers.Wallet(randomWallet.privateKey, provider);
console.log("wallet with provider --- ",walletWithProvider);
let wallet_data = {
  address : walletWithProvider.address,
  privateKey: walletWithProvider.signingKey.privateKey,
  publicKey: walletWithProvider.signingKey.publicKey
};
return wallet_data;
}





module.exports = {
  generate : generate 
};
