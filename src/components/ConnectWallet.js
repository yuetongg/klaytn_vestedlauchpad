import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import VestedLaunchpad from '../contracts/VestedLauchpad.json';

const ConnectWallet = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Initialize Web3 instance
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get user account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Get network ID
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = VestedLaunchpad.networks[networkId];

          // Create contract instance
          const contractInstance = new web3Instance.eth.Contract(
            VestedLaunchpad.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);
        } catch (error) {
          console.error('Error connecting to wallet', error);
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    init();
  }, []);

  return (
    <div>
      <h1>Connect Wallet</h1>
      <p>{account ? `Connected account: ${account}` : 'Not connected'}</p>
      {contract && (
        <div>
          <p>Contract loaded: {contract.options.address}</p>
          {/* Additional UI for interacting with the contract */}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
