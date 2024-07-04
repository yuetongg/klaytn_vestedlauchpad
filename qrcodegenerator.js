const QRCode = require('qrcode');

const vestingInfo = {
    beneficiary: "0x6834919D220e19fed26cf8B37B1438C1803D543e",
    totalAmount: "1000000000000000000000", // 1000 tokens in wei
    start: 1688019200, // Unix timestamp
    cliff: 2592000, // 30 days in seconds
    duration: 31536000 // 1 year in seconds
};

const vestingInfoStr = JSON.stringify(vestingInfo);

// Generate QR code
QRCode.toFile('vestingInfo.png', vestingInfoStr, (err) => {
    if (err) throw err;
    console.log('QR code generated and saved as vestingInfo.png');
});
