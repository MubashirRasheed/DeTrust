"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers, Contract } from 'ethers';
import ContractAbi from '../hardhat/artifacts/contracts/ReviewNFTContract.sol/ReviewNFTContract.json'; // Import your contract ABI

interface EthereumContextProps {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  contract: Contract | null;
}

const EthereumContext = createContext<EthereumContextProps>({
  provider: null,
  signer: null,
  contract: null,
});

export function useEthereum() {
  return useContext(EthereumContext);
}

interface EthereumProviderProps {
  children: ReactNode;
}

export function EthereumProvider({ children }: EthereumProviderProps) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    // Initialize Ethereum provider and signer
    async function initializeEthereum() {
      if (window.ethereum) {
        try {
          const ethProvider = new ethers.BrowserProvider(window.ethereum);
          const ethSigner = await ethProvider.getSigner();

          setProvider(ethProvider);
          setSigner(ethSigner);

          if (ethSigner) {
            const deployedContract = new ethers.Contract(
              '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9', // Replace with your contract address
              ContractAbi.abi,
              ethSigner
            );
            setContract(deployedContract);
          }
        } catch (error) {
          console.error('Error initializing Ethereum:', error);
        }
      } else {
        console.error('Please install MetaMask or another Ethereum-compatible browser extension.');
      }
    }

    initializeEthereum();
  }, []);

  return (
    <EthereumContext.Provider value={{ provider, signer, contract }}>
      {children}
    </EthereumContext.Provider>
  );
}
