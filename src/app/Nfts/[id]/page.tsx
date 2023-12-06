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
interface DomainData {
  domain: string;
  username: string;
  category: string;
  description: string;
  businessLogoUrl: string;
}

const DomainNFTPage = () => {
  const { contract, signer, provider } = useEthereum();
  const [loading, setLoading] = useState(true);
  const [nftsTokenId, setNftsTokenId] = useState<NFT[]>([]);
  const [domainData, setDomainData] = useState<DomainData[]>([
    {
      domain: '',
      username: '',
      category: '',
      description: '',
      businessLogoUrl: ''
    }
  ]);
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
  
  const fetchDomainData = useCallback(async () => {
    if (signer && contract) {
      try {
        const domainDetail = await contract.getRegisteredDomainsData();
        const strucData =  extractDomainDetails(domainDetail);
        // console.log("strucData:", strucData);
        const domainData = await strucData.filter((item) => item.domain === domain);
        // console.log("domainData:", domainData);
        setDomainData(domainData);
        
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
  fetchDomainData();

  }, [fetchData, fetchDomainData]);

  if (loading) {
    return <div>Loading...</div>;
  }
console.log("Domaindata:", domainData);
  const extractDomainDetails = (result: any) => {
    const domains: DomainData[] = [];
  
    for (let i = 0; i < result.length; i++) {
      const domain = result[i][0]; // Extracting the domain name
      if (domain !== '') {
        const domainData: DomainData = {
          domain: domain,
          username: result[i][1], // Extracting other details like username, category, etc.
          category: result[i][2],
          description: result[i][3],
          businessLogoUrl: result[i][4]
        };
        domains.push(domainData);
      }
    }
  
    return domains;
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{domain}</h1>

      <div className="flex items-center mb-8 flex-row">
        <div className="rounded-xl overflow-hidden mr-8">
          <Image src="/google.png" alt="Picture of the author" width={500} height={500} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">{domain}</h2>
          <div className="mb-4 flex justify-center">
            <h3 className="text-xl font-semibold mb-2"></h3>
            <p className="text-gray-700">{domainData[0].description}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Category</h3>
            <p className="text-gray-700">{domainData[0].category}</p>
          </div>
        </div>
      </div>

      <BussinessDetailTab nftsTokenId={nftsTokenId} />
    </div>
  );
};



export default DomainNFTPage;
