"use client" 
import { useState, useEffect } from 'react';
import { useEthereum } from '@/contextProvider/smartcontractContext';
import { usePathname } from 'next/navigation';










const NFTs = () => {
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    const { signer, contract } = useEthereum();
    const pathname = usePathname()
    useEffect(() => {
        const fetchNfts = async () => {
            const domain  = pathname.split('/')[2];
        const data = await contract.fetchItemsCreated();
        setNfts(nfts);
        setLoadingState('loaded');
        };
        fetchNfts();
    }, []);
    if (loadingState === 'loaded' && !nfts.length)
        return (
        <div className="container mx-auto">
            <h1 className="text-4xl py-4 text-center">No NFTs Found</h1>
        </div>
        );
    return (
        <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };

export default NFTs;