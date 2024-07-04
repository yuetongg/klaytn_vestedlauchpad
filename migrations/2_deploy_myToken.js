// migrations/2_deploy_contracts.js
const MyToken = artifacts.require("MyToken");

module.exports = function(deployer) {
  const name = "My Token";
  const symbol = "MTK";
  const initialSupply = web3.utils.toBN(1000000).mul(web3.utils.toBN(10).pow(web3.utils.toBN(18))); // Example: 1,000,000 tokens with 18 decimals

  deployer.deploy(MyToken, name, symbol, initialSupply);
};
