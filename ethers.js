const { ethers } = require("ethers");

async function approveTokenTransfer(tokenContractAddress, contractAddress, amount, signer) {
    const tokenABI = [
        "function approve(address spender, uint256 amount) public returns (bool)"
    ];
    const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
    const tx = await tokenContract.approve(contractAddress, amount);
    await tx.wait();
    console.log('Token transfer approved');
}
