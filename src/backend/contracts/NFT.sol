//SPDX-Lincense-Identifier: MIT

pragma solidity  ^0.8.4 ;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;

    constructor() ERC721("SAI NFT","SAI"){

    }

    function mint(string memory _tokenURI) external returns(uint) {
        tokenCount ++;
        /** msg.sender is global variable available with tokenid of sender */
        _safeMint(msg.sender, tokenCount);
        //Set Token Meta Data
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }
}