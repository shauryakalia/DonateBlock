pragma solidity ^0.4.16;


contract CampaignFactory {
    
    address[] public deployedCampaigns;

    function createCampaign(uint aim) public returns(address) {
        address newCampaign = new DonateBlockCampaign(aim, msg.sender); 
        deployedCampaigns.push(newCampaign);
        return newCampaign;
    }

    function getAllCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}


contract DonateBlockCampaign {

    address public vendorAddress;
    uint public value;
    uint findVendor;
    bool public complete;
    address public organization;
    address[] public donors;
    uint public amountRequired;

    modifier restricted() {
        require(msg.sender == organization);
        _;
    }

    function DonateBlockCampaign (uint aim, address org) public {
        organization = org;
        amountRequired = aim;        
        complete = false;
        findVendor = 0; 
    }

    function donate() public payable {
        //amountRaised = amountRaised + msg.value; use : this.balance
        donors.push(msg.sender);
        if (this.balance >= amountRequired) {
            // call find vendor
            findVendor = 1; 
        }
    }

    function payVendor(address recipient, uint val) public restricted {
        vendorAddress = recipient;
        value = val;
        recipient.transfer(val);
    }
}
