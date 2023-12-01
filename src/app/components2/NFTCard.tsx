import Image from 'next/image';
import Link from 'next/link';
// import React, { useContext } from 'react';

// import { NFTContext } from '../context/NFTContext';
// import images from '../assets';
interface NFTCardProps {
    nft: any;
    onProfilePage: boolean;
    }

const NFTCard = ({ nft, onProfilePage }: NFTCardProps) => {
const nftCurrency = "ETH";
const shortenAddress = (address:string) =>  {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    // console.log("nft: jsonnnnnnn", nft);

    const ownerCheck = () => {
        if (nft.owner == nft.seller) {
            return nft.owner;
        }else{
          return nft.seller 
        } 
      }
  return (

    
      <div className="flex-1 flex-wrap gap-6 min-w-215 w-[40em] bg-nft-black-3 rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-lg"
      onClick={() => {window.location.href = (`/nftdetail/${encodeURIComponent(nft.tokenId.toString())}`)}  }
      >
        <div className="relative w-full flex-col h-52 sm:h-36  minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.tokenURI}
            layout="fill"
            objectFit="contain"
            alt={`nft${nft.i}`}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppinstext-white text-nft-black-1 font-semibold text-sm minlg:text-xl">{nft.name}</p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins text-white  font-semibold text-xs minlg:text-lg">{nft.price.toString()} <span className="normal">{nftCurrency}</span></p>
            <p className="font-poppins text-white  font-semibold text-xs minlg:text-lg">{shortenAddress(ownerCheck())}</p>
          </div>

        </div>
      </div>
  
  );
};

export default NFTCard;
