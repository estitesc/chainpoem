pragma solidity ^0.5.0;

contract Poem {
    string public name;
    uint public lineCount = 0;
    mapping(uint => PoemLine) public lines;

    struct PoemLine {
        uint id;
        string content;
        address payable poet;
    }

    event LineAdded(
        uint id,
        string content,
        address payable poet
    );

    constructor() public {
        name = "Blockpoem d'App";
    }

    function addLine(string memory _content) public {
        // Require a valid name
        require(bytes(_content).length > 0);
        // Increment product count
        lineCount ++;
        // Create the product
        lines[lineCount] = PoemLine(lineCount, _content, msg.sender);
        // Trigger an event
        emit LineAdded(lineCount, _content, msg.sender);
    }
}