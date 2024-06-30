import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [campaignInfo, setCampaignInfo] = useState({
    contractAddress: "0xDeployedVestedLaunchpadAddress",
    vendorAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    campaignId: "1234",
    campaignName: "Project XYZ",
    description: "Fundraising for Project XYZ",
    suggestedContribution: "100",
    tokenType: "KLAY",
    milestones: [
      {
        id: "1",
        description: "Initial Development",
        fundReleasePercentage: "50%"
      },
      {
        id: "2",
        description: "Product Launch",
        fundReleasePercentage: "50%"
      }
    ],
    expirationDate: "2024-12-31T23:59:59Z",
    nonce: "unique_nonce_value",
    callbackURL: "https://vestedlaunchpad.com/campaign/1234",
    instructions: "Scan to connect your wallet and contribute to Project XYZ."
  });

  const generateQRCodeValue = () => {
    return JSON.stringify(campaignInfo);
  };

  return (
    <div>
      <h1>Generate QR Code</h1>
      <QRCode value={generateQRCodeValue()} />
      <pre>{generateQRCodeValue()}</pre> {/* Display the JSON for reference */}
    </div>
  );
};

export default QRCodeGenerator;
