"use client"
import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEthereum } from '@/contextProvider/smartcontractContext';
import { useWallet } from '@/contextProvider/walletContext';
// import { NFTContext } from '../context/NFTContext';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

// import images from '../assets';


const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const PaymentBodyCmp = ({ nft, nftCurrency }) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins text-whitefont-semibold text-base minlg:text-xl">Item</p>
      <p className="font-poppins text-white font-semibold text-base minlg:text-xl">Subtotal</p>
    </div>
    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image
            src={nft.image}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex justify-center items-start flex-col ml-5">
          <p className="font-poppins text-white font-semibold text-sm minlg:text-xl">{shortenAddress(nft.seller)}</p>
          <p className="font-poppins text-white font-semibold text-sm minlg:text-xl">{nft.name}</p>

        </div>
      </div>
      <div>
        <p className="font-poppins text-white font-normal text-sm minlg:text-xl">{nft.price} <span className="font-semibold">{nftCurrency}</span></p>
      </div>

    </div>
    <div className="flexBetween mt-10">

      <p className="font-poppins text-white font-normal text-base minlg:text-xl">Total</p>
      <p className="font-poppins text-white font-normal text-sm minlg:text-xl">{nft.price} <span className="font-semibold">{nftCurrency}</span></p>
    </div>
  </div>
);

const NFTDetails = () => {
//   const { currentAccount, nftCurrency, buyNFT , isLoadingNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [nft, setNft] = useState({ image: '', tokenId: '', name: '', owner: '', price: '', seller: '' });

  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
const pathname = usePathname();
const tokenIDquery = pathname.split('/')[2];
const { signer, contract} = useEthereum();
const {account } = useWallet();
console.log("tokenIDquery:", tokenIDquery, account);


  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      const nft = await contract.getNFTSDetails(tokenIDquery)
      console.log("nft:", nft);
      setNft(nft);
      setIsLoading(false);
    };
    
    fetchData();
  }, [fetchData]);

  const checkout = async () => {
    await buyNFT(nft);

    setPaymentModal(false);
    setSuccessModal(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flex justify-center items-center sm:px-4 p-12 vorder-r md:border-r-0 md:border-b border-nft-black-1 ">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          <Image
            src={nft.image}
            objectFit="cover"
            className="rounded-xl shadow-lg"
            layout="fill"
          />
        </div>

      </div>

      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins text-white  font-semibold text-2xl minlg:text-3xl">{nft.name}</h2>
        </div>
        <div className="mt-10">
          <p className="font-poppins text-white  text-xs minlg:text-base font-normal">Creator</p>
          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={images.creator1}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="font-poppins text-white text-xs minlg:text-base font-semibold">{shortenAddress(nft.seller)}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b border-nft-gray-3 flex -flex-row">
            <p className="font-poppins text-white text-base minlg:text-base font-medium mb-2">Details</p>

          </div>
          <div className="mt-3">
            <p className="font-poppins text-white  text-base font-normal">{nft.description}</p>
          </div>

        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === nft.seller.toLowerCase()
            ? (
              <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border-gray p-2">You cannot buy your own NFT</p>
            )
            : currentAccount === nft.owner.toLowerCase() ? (
              <Button
                btnName="List on MarketPLace"
                classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                handleClick={() => router.push(`/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
              />
            ) : (
              <Button
                btnName={`Buy for ${nft.price} ${nftCurrency}
                `}
                classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                handleClick={() => setPaymentModal(true)}
              />
            )}

        </div>

      </div>
      {paymentModal && (
      <Modal
        header="Check Out"
        body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
        footer={(
          <div className="flex flex-row sm:flex-col">
            <Button
              btnName="Checkout"
              classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
              handleClick={checkout}
            />
            <Button
              btnName="Cancel"
              classStyles="rounded-xl"
              handleClick={() => { setPaymentModal(false); }}
            />
          </div>
        )}
        handleclose={() => setPaymentModal(false)}
      />
      )}
      {isLoadingNFT && (
      <Modal
        header="Buying NFT..."
        body={(
          <div className='flex justify-center items-center flex-col text-center'>
            <div className='relative w-52 h-52'>
                <Loader />
            </div>
          </div>
        )}
        
        handleclose={() => setPaymentModal(false)}
      />
      )}
      {successModal && (
      <Modal
        header="Payment Sucessful"
        body={(
          <div className="flex justify-center items-center flex-col text-center" onClick={() => setSuccessModal(false)}>
            <div className="relative w-52 h-52">
              <Image src={nft.image} objectFit="cover" layout="fill" />
            </div>

            <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl mt-10">You successfully purchased <span className="font-semibold">{nft.name}</span> from <span className="font-semibold">{shortenAddress(nft.seller)}</span></p>
          </div>
)}
        footer={(
          <div className="flex justify-center items-center  flex-col">
            <Button
              btnName="Check it Out"
              classStyles="sm:mb-5 sm:mr-0 rounded-xl"
              handleClick={() => router.push('/my-nfts')}
            />

          </div>
        )}
        handleclose={() => setPaymentModal(false)}
      />
      )}

    </div>
  );
};

export default NFTDetails;
