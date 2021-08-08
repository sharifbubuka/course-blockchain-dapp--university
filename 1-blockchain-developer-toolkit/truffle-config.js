// Bug: Error: PollingBlockTracker - encountered an error while attempting to update latest block:
//      Error: ETIMEDOUT

require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
          1
        )
      }, 
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42,
      networkCheckTimeout: 10000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}