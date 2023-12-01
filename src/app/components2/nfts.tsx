"use client" 
import { useState, useEffect } from 'react';
import { useEthereum } from '@/contextProvider/smartcontractContext';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ethers } from 'ethers';
import NFTCard from './NFTCard';








interface NFT {
    tokenId: number;
    tokenURI: string;
    seller: string;
    owner: string;
    price: number;
    sold: boolean;
    businessDomain: string;
    comments: string[];
    upvotes: number;
    downvotes: number;
    moderated: boolean;
    timestamp: number;
    category: string;
    // Other properties of the NFT...
    }
    
    

const NFTs = ({nftsTokenId}: any) => {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    const { signer, contract } = useEthereum();
    const pathname = usePathname()

    useEffect(() => {
        const fetchNfts = async () => {
            const domain  = pathname.split('/')[2];
        // const data = await contract.fetchNFTsByDomain(domain);
        console.log("nftsTokenId:", domain, nftsTokenId);
        const nftTokenIds = Object.values(nftsTokenId);
        if (signer && contract) {
            const nftTokenIds = Object.values(nftsTokenId);
    
            const nftstokendetail = await Promise.all(
              nftTokenIds.map(async (nftTokenId: any) => {
                const nftdetail = await contract.getNFTSDetails(nftTokenId);
                console.log("nftdetail:", nftdetail);
                return nftdetail;
              })
            );
    
            console.log("nftstokendetail:", nftstokendetail);
            setNfts(nftstokendetail);
            setLoadingState('loaded');
          }
      
        
        // console.log(data);
        // const nftData = await contract.getNFTSDetails()
        // setNfts(nfts);
        setLoadingState('loaded');
        };
     fetchNfts();

    }, [nftsTokenId]);
    if (loadingState === 'loaded' && nfts.length == 0) 
        return (
        <div className="container mx-auto">
            <h1 className="text-4xl py-4 text-center">No NFTs Found</h1>
        </div>
        );
        // console.log("nfts:", nfts[0]);
        const checckIfNFTSold = (nft: any) => {
            if (nft.sold == false) {
              return true;
            }
            return false;
          };
          console.log("nfts: detail in bussines", nfts);
          console.log("nfts:", checckIfNFTSold(nfts));
    return (
        <div className="flex flex-row w-full">
        <div className="flex flex-wrap justify-center gap-6">
          {/* {nfts.map((nft, i) => (
            <div key={i} className="border border-slate-950 rounded-xl w-[1/3]">
              <div className="relative h-64">
                <Image
                  src={nft.tokenURI}
                  alt="NFT Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4 bg-gray-800 text-white">
                <p className="text-lg font-semibold">Price - {nft.price.toString()} Eth</p>
              </div>
              <div className="p-4 bg-gray-800 text-white">
                <p className="text-lg font-semibold">Seller - {nft.seller.slice(0, 8)}...</p>
              </div>
              <div className="p-4 bg-gray-800 text-white">
                <p className="text-lg font-semibold">Owner - {nft.owner.slice(0, 8)}...</p>
              </div>
              <div className="p-4 bg-gray-800 text-white">
                <p className="text-lg font-semibold">Sold - {nft.sold.toString()}</p>
              </div>
              <div className="p-4 bg-gray-800 text-white">
                <p className="text-lg font-semibold">Business Domain - {nft.businessDomain}</p>
              </div>
            </div>
          ))} */}


          {/* {nfts.map((nft, i) => (
            <NFTCard key={i} nft={nft} onProfilePage={false} />
            ))}
             */}
             {nfts.map((nft, i) => (
              nft.sold == false && <NFTCard key={i} nft={nft} onProfilePage={false} />
              ))}
        </div>
      </div>
    );
    };

export default NFTs;