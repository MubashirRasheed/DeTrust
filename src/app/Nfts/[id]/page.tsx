/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect, useState, useCallback } from 'react';
import { useEthereum } from '@/contextProvider/smartcontractContext';
import { usePathname, useRouter } from 'next/navigation';
import NFTDeatilTabs from '@/app/components2/BussinessDetail';
import Image from 'next/image';
import BussinessDetailTab from '@/app/components2/BussinessDetail';

interface NFT {
  tokenId: number;
  // Other properties of the NFT...
}

interface DomainNFTProps {
  nfts: NFT[];
  domain: string;
}

const DomainNFTPage = () => {
  const { contract, signer, provider } = useEthereum();
  const [loading, setLoading] = useState(true);
  const [nftsTokenId, setNftsTokenId] = useState<NFT[]>([]);
  const pathname = usePathname();
const domain = pathname.split('/')[2];
  const fetchData = useCallback(async () => {
    if (signer && contract) {
      try {
        console.log("Domain:", domain);
        const data = await contract.fetchNFTsByDomain(domain);
        console.log("Data:", data);
        setNftsTokenId(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
  }, [signer, contract, domain]);
  

  useEffect(() => {
    // Your existing logic to fetch NFTs and set loading state
    // This useEffect won't execute on page refresh as data is fetched server-side.
fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">NFTs for Domain: {domain}</h1>

      <div className="flex items-center mb-8">
        <div className="rounded-xl overflow-hidden mr-8">
          <Image src="/google.png" alt="Picture of the author" width={500} height={500} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">{domain}</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">Domain Description</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Reviews</h3>
            <p className="text-gray-700">Reviews</p>
          </div>
        </div>
      </div>

      <BussinessDetailTab nftsTokenId={nftsTokenId} />
    </div>
  );
};



export default DomainNFTPage;
