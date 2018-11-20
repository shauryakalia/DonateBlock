const compiledFactory = require("../../ethereum/build/CampaignFactory.json");
const ethers = require("ethers");
const config = require("../config");

module.exports = {
  deploy: async() => {
    let provider = ethers.getDefaultProvider('rinkeby');
    let privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
    let wallet = new ethers.Wallet(privateKey, provider);
    let abi = compiledFactory.interface;
    let bytecode = compiledFactory.bytecode;
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy();
    console.log(contract.address);
    await contract.deployed();
  }
};
