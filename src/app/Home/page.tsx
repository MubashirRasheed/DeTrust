"use client"
import { ethers } from 'ethers';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useEthereum } from '@/contextProvider/smartcontractContext';



const IndexPage = () => {
  const [imageCards, setImageCards] = useState<DomainData[]>([])

  const [loading, setLoading] = useState(true);
  const { contract, provider, signer } = useEthereum();
  const [rawData, setRawData] = useState<any>(null);

 
  interface DomainData {
    domain: string;
    username: string;
    category: string;
    description: string;
    businessLogoUrl: string;
  }

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
  


const fetchData = useCallback(async () => {
  if (signer && contract) {
    try {
      const data = await contract.getRegisteredDomainsData();
      const transformedData = extractDomainDetails(data);
      setImageCards(transformedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }
}, [signer, contract]);

useEffect(() => {
  // const fetchData = async () => {
  //   if (signer && contract) {
  //     const data = await contract.getRegisteredDomainsData();
  //     setLoading(false);
  //     setRawData(data); // Set the raw data received from the contract
  //     console.log("data", data)
  //   }
  // };

  fetchData();
}, [fetchData]);

useEffect(() => {
  if (rawData) {
    // Process the raw data to create domain cards and set imageCards
    const transformedData = extractDomainDetails(rawData);
    setImageCards(transformedData);
    console.log("transformedData", transformedData)
  }
}, [rawData]);

return (
  <div className="flex flex-wrap justify-center">
      {imageCards.map((imageCards, index) => (
        <div key={index} className="max-w-md mx-auto bg-gray-900 shadow-md rounded-xl overflow-hidden m-4 relative">
          {/* Image */}
          <Image
            src={imageCards.businessLogoUrl}
            alt={`Image ${index + 1}`}
            className="w-full h-64 object-cover object-center rounded-t-xl"
            width={500}
            height={300}
          />

          {/* Content */}
          <div className="p-4">
            {/* Domain username */}
            <h2 className="text-xl font-bold mb-2">{imageCards.username}</h2>
            
            {/* Category badge */}
            <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-200">
              {imageCards.category}
            </span>
            
            {/* Description */}
            <p className="text-gray-300 mt-2">{imageCards.description}</p>
            
            {/* Button for details */}
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Details
            </button>
          </div>
          
          {/* Clickable overlay for the entire card */}
          <a href={`nfts/${encodeURI(imageCards.domain)}`} className="absolute inset-0"></a>
        </div>
      ))}
    </div>
);

};

export default IndexPage;
