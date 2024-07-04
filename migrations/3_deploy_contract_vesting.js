// migrations/2_deploy_contracts.js
const Vesting = artifacts.require("Vesting");
const IERC20 = artifacts.require("IERC20"); // Import your IERC20 interface if it's an artifact

module.exports = async function(deployer, network, accounts) {
  const tokenAddress = "0x01D201B5e4305DD40Df66BAc579E14CA0c7282eB"; // Replace with your deployed ERC20 token address

  // Deploy Vesting contract
  await deployer.deploy(Vesting, tokenAddress);
  const vestingContract = await Vesting.deployed();

  // Optionally, you can initialize vesting schedules immediately after deployment
  const beneficiary = accounts[1]; // Example beneficiary address
  const totalAmount = web3.utils.toWei("1000", "ether"); // Example: 1000 tokens
  const start = Math.floor(Date.now() / 1000); // Example: current timestamp
  const cliff = 60 * 60 * 24 * 30; // Example: 30 days in seconds
  const duration = 60 * 60 * 24 * 90; // Example: 90 days in seconds

  await vestingContract.initializeVesting(beneficiary, totalAmount, start, cliff, duration);
};
