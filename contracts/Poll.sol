// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Poll {
    struct PollData {
        string question;
        string[] options;
        mapping(uint256 => uint256) votes; // option index -> vote count
        bool exists;
    }

    PollData public poll;
    address public owner;
    mapping(address => bool) public hasVoted;

    // Constructor initializes only the question
    constructor(string memory _question) {
        require(bytes(_question).length > 0, "Question cannot be empty");

        owner = msg.sender;
        poll.question = _question;
        poll.exists = true;
    }

    // Function to allow owner to add options after deployment
    function addOption(string memory _option) public {
        require(msg.sender == owner, "Only the owner can add options");
        poll.options.push(_option);
    }

    // Function to allow users to vote
    function vote(uint256 _optionIndex) public {
        require(poll.exists, "Poll does not exist.");
        require(_optionIndex < poll.options.length, "Invalid option.");
        require(!hasVoted[msg.sender], "You have already voted.");

        poll.votes[_optionIndex]++;
        hasVoted[msg.sender] = true;
    }

    // Function to get the vote count for a specific option
    function getVoteCount(uint256 _optionIndex) public view returns (uint256) {
        require(_optionIndex < poll.options.length, "Invalid option.");
        return poll.votes[_optionIndex];
    }

    // Function to get all options
    function getOptions() public view returns (string[] memory) {
        return poll.options;
    }

    // Function to get the poll question
    function getQuestion() public view returns (string memory) {
        return poll.question;
    }
}
