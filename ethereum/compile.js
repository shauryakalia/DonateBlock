const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//delete build folder if a huge change and need to compile again 
const buildPath = path.resolve(__dirname , 'build');
fs.removeSync(buildPath);

//read contents of the solidity contract
const campaignPath = path.resolve(__dirname , 'contract', 'donateblock.sol');
const source = fs.readFileSync(campaignPath , 'utf8');

//extract contract source after compiling
const output = solc.compile(source ,1).contracts;

//check if build directory exists , if not then create
fs.ensureDirSync(buildPath);

// for each contract in solidity file
for(let contract in output){
    // output each contract into JSON seperately 
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}