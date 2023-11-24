"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface WalletContextProps {
  account: string | null;
  checkIfWalletIsConnected: () => Promise<void>;
}

const WalletContext = createContext<WalletContextProps>({
  account: null,
  checkIfWalletIsConnected: async () => {},
});

export function useWallet() {
  return useContext(WalletContext);
}

interface WalletConnectionProps {
  children: ReactNode;
}

export function WalletConnection({ children }: WalletConnectionProps) {
  const [account, setAccount] = useState<string | null>(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const currentAccount = accounts[0];
        setAccount(currentAccount);
        console.log("Found an authorized account:", currentAccount);
      } else {
        console.log("No authorized account found");
        alert("Please connect to MetaMask.");
        setAccount(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []); // Run once on component mount

  return (
    <WalletContext.Provider value={{ account, checkIfWalletIsConnected }}>
      {children}
    </WalletContext.Provider>
  );
}
