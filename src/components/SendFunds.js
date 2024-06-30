import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';

const SendFunds = () => {
  const { recipientAddress: initialRecipientAddress } = useParams();
  const [recipientAddress, setRecipientAddress] = useState(initialRecipientAddress || '');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error connecting to wallet:', error);
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    connectWallet();
  }, []);

  const sendFunds = async () => {
    if (!recipientAddress || !amount) {
      console.error('Recipient address and amount are required');
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const amountWei = web3.utils.toWei(amount.toString(), 'ether');

      const transaction = await web3.eth.sendTransaction({
        from: account,
        to: recipientAddress,
        value: amountWei,
        gas: 300000
      });


      console.log('Transaction sent successfully');
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div>
      <h2>Send Funds</h2>
      <p>{account ? `Connected account: ${account}` : 'Not connected'}</p>

      {account && (
        <div>
          <label>Recipient Address:</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <label>Amount (ETH):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={sendFunds}>Send Funds</button>
        </div>
      )}
    </div>
  );
};

export default SendFunds;

