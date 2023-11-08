require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks:{
    hardhat:{
      forking:{
        url:"https://eth-goerli.g.alchemy.com/v2/Ptp2_24S3bIcLjw7392BsBVZjMm25aD-",
      },
    },
  }
};
