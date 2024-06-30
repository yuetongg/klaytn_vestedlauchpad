// migrations/2_deploy_vested_launchpad.js

const VestedLaunchpad = artifacts.require("VestedLaunchpad");

module.exports = function (deployer) {
  deployer.deploy(VestedLaunchpad);
};
