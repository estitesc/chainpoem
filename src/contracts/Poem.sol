pragma solidity ^0.5.0;

contract Poem {
    string public name;
    uint public lineCount = 0;
    mapping(uint => PoemLine) public lines;

    struct PoemLine {
        uint id;
        string content;
        address payable poet;
        uint addedAt;
    }

    event LineAdded(
        uint id,
        string content,
        address payable poet,
        uint addedAt
    );

    constructor() public {
        name = "Sonnet Dapp";
    }

    function addLine(string memory _content) public {
        // Require a valid name
        require(bytes(_content).length > 0);
        // Increment product count
        lineCount ++;
        // Create the product
        lines[lineCount] = PoemLine(lineCount, _content, msg.sender, block.timestamp);
        // Trigger an event
        emit LineAdded(lineCount, _content, msg.sender, block.timestamp);
    }
}