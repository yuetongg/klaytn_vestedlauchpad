// migrations/2_deploy_contracts.js
const MyToken = artifacts.require("MyToken");

module.exports = function(deployer) {
  deployer.deploy(MyToken, 1000000); // Initial supply
};
