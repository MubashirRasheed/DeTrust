"use client"
import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

function NavBar() {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = () => {
    // Code to connect the wallet goes here
    // For example: Your wallet connection logic
    // Once connected, set walletConnected to true
    if(window.ethereum){
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts: any) => {
        console.log(accounts)
        setWalletConnected(true)
      })
      .catch((err: any) => console.log(err))
    }
  };

  return (
    <nav className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">DeTrust</div>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="text-white">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="/domains" className="text-white">
                Domains
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="/my-reviews" className="text-white">
                My Reviews
              </NavigationMenuLink>
            </NavigationMenuItem>

            {walletConnected ? (
              <NavigationMenuItem>
              <NavigationMenuLink href="/review" className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-full">
                Review
              </NavigationMenuLink>
            </NavigationMenuItem>

              
            ) : (
              <NavigationMenuItem>
                   <NavigationMenuLink href="/register" className="text-white">
                Register
              </NavigationMenuLink>
                <NavigationMenuTrigger>
                  <Button
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-700 text-white"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </Button>
                </NavigationMenuTrigger>
             
              </NavigationMenuItem>
            )}

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

export default NavBar;
