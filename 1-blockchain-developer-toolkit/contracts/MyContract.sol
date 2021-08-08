// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyContract {
  string value;
  address private owner;

  event alert(string alert);

  constructor() public {
    value = "myValue";
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function get() public view returns(string memory) {
    return value;
  }

  function set(string memory _value) public onlyOwner {
    value = _value;
    emit alert("Value has been changed");
  }
}