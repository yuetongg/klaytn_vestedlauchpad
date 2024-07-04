const { ethers } = require("ethers");
const fs = require("fs");

// Connect to Ethereum provider (e.g., Infura, Alchemy, or local node)
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/797684361cab4874b26c2a6fd75dc257");
const privateKey = "543b00aaf1e823f6e37d928503f839cc3c562c46fcaaa73b8dc08dfecad105fe"; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Define the token and smart contract ABIs and addresses
const tokenContractAddress = "0x01D201B5e4305DD40Df66BAc579E14CA0c7282eB"; // Replace with your token contract address
const vestingContractAddress = "0x7cB567161C06d279EC6959a94e9dC2bc44a5d188"; // Replace with your vesting contract address

const tokenABI = [
    "function approve(address spender, uint256 amount) public returns (bool)"
];

const vestingContractABI = [
    "function initializeVesting(address beneficiary, uint256 totalAmount, uint256 start, uint256 cliff, uint256 duration) public"
];

// Create contract instances
const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, wallet);
const vestingContract = new ethers.Contract(vestingContractAddress, vestingContractABI, wallet);

// Read sample data from JSON file
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

// Function to approve token transfer
async function approveTokenTransfer(beneficiary, totalAmount) {
    try {
        const tx = await tokenContract.approve(vestingContractAddress, totalAmount);
        await tx.wait();
        console.log(`Token transfer approved for ${beneficiary}`);
    } catch (error) {
        console.error(`Error approving token transfer for ${beneficiary}:`, error);
    }
}

// Function to initialize vesting schedule
async function initializeVesting(beneficiary, totalAmount, start, cliff, duration) {
    try {
        const tx = await vestingContract.initializeVesting(beneficiary, totalAmount, start, cliff, duration);
        await tx.wait();
        console.log(`Vesting schedule initialized successfully for ${beneficiary}`);
    } catch (error) {
        console.error(`Error initializing vesting schedule for ${beneficiary}:`, error);
    }
}

// Main function to process each entry in the JSON file
async function processVesting() {
    for (const entry of data) {
        const { beneficiary, totalAmount, start, cliff, duration } = entry;
        await approveTokenTransfer(beneficiary, totalAmount);
        await initializeVesting(beneficiary, totalAmount, start, cliff, duration);
    }
}

// Execute the main function
processVesting();
