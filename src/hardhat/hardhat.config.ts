// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.19",
// };

// export default config;


import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.8.20",
        settings: {},
      },
    ],
  },
  paths: {
    artifacts: "D:/Blockchain/DeTrust/deetrust/src/hardhat/artifacts",
    sources: "D:/Blockchain/DeTrust/deetrust/src/hardhat/contracts", 
  },
};

export default config;
