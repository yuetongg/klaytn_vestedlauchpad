import React, { useState } from 'react';
import { ethers } from 'ethers';
import { QrReader } from 'react-qr-reader';

function VestingScanner() {
    const [vestingInfo, setVestingInfo] = useState(null);
    const [wallet, setWallet] = useState(null);

    const handleScan = (data) => {
        if (data) {
            const info = JSON.parse(data);
            setVestingInfo(info);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            setWallet(signer);
        } else {
            console.log("No Ethereum wallet detected");
        }
    };

    const initializeVesting = async () => {
        if (!vestingInfo || !wallet) {
            console.log("Missing vesting info or wallet connection");
            return;
        }

        const tokenContractAddress = "0x01D201B5e4305DD40Df66BAc579E14CA0c7282eB"; // Replace with your token contract address
        const vestingContractAddress = "0x7cB567161C06d279EC6959a94e9dC2bc44a5d188"; // Replace with your vesting contract address

        const tokenABI = [
            "function approve(address spender, uint256 amount) public returns (bool)"
        ];

        const vestingContractABI = [
            "function initializeVesting(address beneficiary, uint256 totalAmount, uint256 start, uint256 cliff, uint256 duration) public"
        ];

        const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, wallet);
        const vestingContract = new ethers.Contract(vestingContractAddress, vestingContractABI, wallet);

        try {
            const { beneficiary, totalAmount, start, cliff, duration } = vestingInfo;

            // Approve token transfer
            const approveTx = await tokenContract.approve(vestingContractAddress, totalAmount);
            await approveTx.wait();

            // Initialize vesting
            const vestingTx = await vestingContract.initializeVesting(beneficiary, totalAmount, start, cliff, duration);
            await vestingTx.wait();

            console.log("Vesting initialized successfully");
        } catch (error) {
            console.error("Error initializing vesting:", error);
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            {vestingInfo && (
                <div>
                    <h3>Vesting Info</h3>
                    <p>Beneficiary: {vestingInfo.beneficiary}</p>
                    <p>Total Amount: {vestingInfo.totalAmount}</p>
                    <p>Start: {vestingInfo.start}</p>
                    <p>Cliff: {vestingInfo.cliff}</p>
                    <p>Duration: {vestingInfo.duration}</p>
                    <button onClick={initializeVesting}>Initialize Vesting</button>
                </div>
            )}
        </div>
    );
}

export default VestingScanner;
