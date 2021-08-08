const MyContract = artifacts.require('MyContract');
const truffleAssert = require('truffle-assertions');

contract('MyContract', (accounts) => {

  let instance;
  beforeEach('setup the contract instance', async () => {
    instance = await MyContract.deployed()
  })

  it('should initialize with the correct value', async () => {
    const value = await instance.get()

    assert.equal(value, 'myValue')
  })

  it('should update the value', async () => {
    await instance.set('New Value')
    const value = await instance.get()

    assert.equal(value, 'New Value')
  })

  // testing a modifier
  it('value should be changed by owner only', async () => {
    await truffleAssert.reverts(instance.set('New Value', {'from': accounts[1]}));
    const value = await instance.get()

    assert.equal(value, 'New Value')
  })

  it('should return the correct event alert', async () => {
    const changed = await instance.set('New Value', {'from': accounts[0]});

    truffleAssert.eventEmitted(changed, 'alert', (event) => {
      return event.alert == 'Value has been changed';
    });
  })

  it('should print the event paremeters', async()=>{
    const changed = await instance.set('New Value', {'from': accounts[0]});
    truffleAssert.prettyPrintEmittedEvents(changed);
  })
})