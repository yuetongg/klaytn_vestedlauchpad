// contracts/VestedLaunchpad.sol
pragma solidity ^0.8.0;

contract VestedLaunchpad {
    // Define state variables and functions here

    struct Milestone {
        string description;
        uint256 fundReleasePercentage;
    }

    struct Campaign {
        string name;
        string description;
        address payable vendorAddress;
        uint256 suggestedContribution;
        string tokenType;
        Milestone[] milestones;
        uint256 expirationDate;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    constructor() {
        campaignCount = 0;
    }

    function createCampaign(
        string memory name,
        string memory description,
        address payable vendorAddress,
        uint256 suggestedContribution,
        string memory tokenType,
        uint256 expirationDate
    ) public {
        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.name = name;
        newCampaign.description = description;
        newCampaign.vendorAddress = vendorAddress;
        newCampaign.suggestedContribution = suggestedContribution;
        newCampaign.tokenType = tokenType;
        newCampaign.expirationDate = expirationDate;
        campaignCount++;
    }

    function contribute(uint256 campaignId) public payable {
        require(campaignId < campaignCount, "Campaign does not exist");
        require(msg.value > 0, "Contribution must be greater than 0");
        campaigns[campaignId].vendorAddress.transfer(msg.value);
    }
}
