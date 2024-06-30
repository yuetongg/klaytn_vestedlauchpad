import React, { useState } from 'react';
import WalletConnector from './components/walletConnector';
import QRCodeGenerator from './components/QRCodeGenerator';

const App = () => {
  const [account, setAccount] = useState(null);
  const contractAddress = "0xF984Eb190c4F6af1a3A8bA328884c8956A266f83"; // Replace with your actual contract address

  return (
    <div>
      <WalletConnector onConnected={setAccount} />
      {account && <QRCodeGenerator contractAddress={contractAddress} />}
    </div>
  );
};

export default App;
