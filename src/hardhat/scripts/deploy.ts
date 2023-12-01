import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now());
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

 



  const lock = await ethers.deployContract("ReviewNFTContract")

  await lock.waitForDeployment();

  console.log(
  `Contract deployed with account: ${deployer.address} at ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
