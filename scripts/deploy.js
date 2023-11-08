const hre = require("hardhat");

async function main() {
  //ERC20 BOO TOKEN
  const BooToken = await hre.ethers.getContractFactory("BooToken");
  const booToken = await BooToken.deploy();
  await booToken.waitForDeployment();
  console.log(`BOO waitForDeployment to ${booToken.target}`);

  //ERC20 LIFE TOKEN
  const LifeToken = await hre.ethers.getContractFactory("LifeToken");
  const lifeToken = await LifeToken.deploy();
  await lifeToken.waitForDeployment();
  console.log(`LIfe waitForDeployment to ${lifeToken.target}`);

  //SingleSwapToken
  const SingleSwapToken = await hre.ethers.getContractFactory(
    "SingleSwapToken"
  );
  const singleSwapToken = await SingleSwapToken.deploy();
  await singleSwapToken.waitForDeployment();
  console.log(`SingleSwapToken waitForDeployment to ${singleSwapToken.target}`);

  //SwapMultiHop
  const SwapMultiHop = await hre.ethers.getContractFactory("SwapMultiHop");
  const swapMultiHop = await SwapMultiHop.deploy();
  await swapMultiHop.waitForDeployment();
  console.log(`swapMultiHop waitForDeployment to ${swapMultiHop.target}`);

  //USER DATA CONTRACT
  // const UserStorageData = await hre.ethers.getContractFactory(
  //   "UserStorageData"
  // );
  // const userStorageData = await UserStorageData.deploy();
  // await userStorageData.waitForDeployment();
  // console.log(`UserStorageData waitForDeployment to ${userStorageData.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
