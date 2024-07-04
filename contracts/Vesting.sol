pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Vesting {
    IERC20 public token;
    
    struct VestingSchedule {
        uint256 totalAmount;
        uint256 start;
        uint256 cliff;
        uint256 duration;
        uint256 released;
        bool isRevocable;
    }

    mapping(address => VestingSchedule) public vestingSchedules;
    mapping(address => bool) public hasVestingSchedule;

    event VestingInitialized(address indexed beneficiary, uint256 totalAmount, uint256 start, uint256 cliff, uint256 duration);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function initializeVesting(
        address beneficiary,
        uint256 totalAmount,
        uint256 start,
        uint256 cliff,
        uint256 duration
    ) public {
        require(!hasVestingSchedule[beneficiary], "Vesting schedule already exists for this beneficiary");

        // Transfer tokens to the contract
        require(token.transferFrom(msg.sender, address(this), totalAmount), "Token transfer failed");

        vestingSchedules[beneficiary] = VestingSchedule({
            totalAmount: totalAmount,
            start: start,
            cliff: start + cliff,
            duration: duration,
            released: 0,
            isRevocable: true
        });

        hasVestingSchedule[beneficiary] = true;

        emit VestingInitialized(beneficiary, totalAmount, start, cliff, duration);
    }
}
