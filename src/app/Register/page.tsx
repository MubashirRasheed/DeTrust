"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Contract, ethers } from 'ethers';
import ContractAbi from '../../hardhat/artifacts/contracts/ReviewNFTContract.sol/ReviewNFTContract.json';
import { useWallet } from "@/contextProvider/walletContext"
import { useEthereum } from "@/contextProvider/smartcontractContext"
const Register = () => {
  const [isBusinessSelected, setIsBusinessSelected] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [businessType, setBusinessType] = React.useState('');
  // const [account, setAccount] = React.useState('');
  const {account, checkIfWalletIsConnected} = useWallet();
  const {contract, provider, signer} = useEthereum();


  // const provider = new ethers.JsonRpcProvider('http://localhost:8545');
  
  const handleBusinessSelection = (value: string) => {
    setBusinessType(value);
    console.log("Business Type:", value);
    if (value === 'true') {
      setIsBusinessSelected(true);
    } else {
      setIsBusinessSelected(false);
    }
    
  };
// const checkIfWalletIsConnected = async () => {
//   try {
//     const { ethereum } = window;
//     if (!ethereum) {
//       console.log("Make sure you have metamask!");
//       return;
//     } else {
//       console.log("We have the ethereum object", ethereum);
//     }
//     const accounts = await ethereum.request({ method: 'eth_accounts' });
//     if (accounts.length !== 0) {
//       const account = accounts[0];
//       setAccount(account);
//       console.log("Found an authorized account:", account);
//     } else {
//       console.log("No authorized account found");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

React.useEffect(() => {
  checkIfWalletIsConnected();
  console.log("account", account)

}
, [account,checkIfWalletIsConnected]);

  const handleDone = async () => {
    console.log("User Name:", userName);
    console.log("Business Type:", businessType); // Logging the businessType value
    // Log additional fields based on business selection
    try{
      
    const provider = new ethers.BrowserProvider(window.ethereum);
  console.log("ethers", provider)
  const signer = await provider.getSigner();
  const logopic = 'https://static1.anpoimages.com/wordpress/wp-content/uploads/2020/12/14/google-dark-background-hero.png'
  console.log("user data", userName, businessType, domain, category, description,  logopic)

  // const contract = new Contract( "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", ContractAbi.abi, signer);
  console.log("contract", contract)
  
    if (isBusinessSelected) {
      // Log additional fields related to business
      // ...
      const registerUser = await contract.registerUser(userName, businessType, domain,description, category,   logopic);
  console.log("registerUser", registerUser)
    }
    else {
      const registerUser = await contract.registerUser(userName, businessType, domain,description, category,   '');
  console.log("registerUser", registerUser)
  }
  }
  catch(e){
    console.log("error", e)
  }
  };

  const [domain, setDomain] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [logo, setLogo] = React.useState('');

  

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>You are one step away from DeTrust</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">User Name</Label>
                <Input id="name" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Business</Label>
                <Select onValueChange={handleBusinessSelection} value={businessType}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">no</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Additional fields for Business */}
              {isBusinessSelected && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="domain">Domain</Label>
                    <Input id="domain" placeholder="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
                  </div>
                  {/* <div className="grid w-full max-w-sm items-center rounded-full gap-1.5">
      <Label htmlFor="picture">Logo</Label>
      <Input id="picture" type="file" value={logo} onChange={(e) => setLogo(e.target.value)} />
    </div> */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="desc">Description</Label>
                    <Input id="desc" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleDone}>Done</Button>
        </CardFooter>
      </Card>
    </div>
  )
}



export default Register