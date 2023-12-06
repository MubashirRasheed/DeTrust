"use client"
import React, { useState, useContext, useEffect, use, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEthereum } from '@/contextProvider/smartcontractContext';
import { useWallet } from '@/contextProvider/walletContext';
// import { NFTContext } from '../context/NFTContext';
import Loader from '../../components2/Loader';
import Button from '../../components2/Button';
import Modal from '../../components2/Modal';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Comment from '@/app/components2/Comment';
import { ethers } from 'ethers';
// import { faArrowUp, faArrowDown } from '@fortawesome/react-fontawesome';

// import images from '../assets';


// const shortenAddress = (addressss:string) => `${addressss.slice(0, 6)}...${addressss.slice(-4)}`;


interface PaymentBodyProps {
  nft: any;
  nftCurrency: string;
}
interface renderCommentsProps {
  comments: any;
}

const PaymentBodyCmp = ({ nft, nftCurrency }: PaymentBodyProps) => (
  <div className="flex flex-col">
    <div className="flex flex-col">
      <p className="font-poppins text-whitefont-semibold text-base ">Item</p>
      <p className="font-poppins text-white font-semibold text-base">Subtotal</p>
    </div>
    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image
            src={nft.tokenURI}
            layout="fill"
            objectFit="contain"
            alt='nft image'
          />
        </div>
        <div className="flex justify-center items-start flex-col ml-5">
          {/* <p className="font-poppins text-white font-semibold text-sm minlg:text-xl">{shortenAddress(nft.seller)}</p> */}
          <p className="font-poppins text-white font-semibold text-sm minlg:text-xl">{nft.seller}</p>
          <p className="font-poppins text-white font-semibold text-sm minlg:text-xl">{nft.username}</p>

        </div>
      </div>
      <div>
        <p className="font-poppins text-white font-normal text-sm minlg:text-xl">{nft.price.toString()} <span className="font-semibold">{nftCurrency}</span></p>
      </div>

    </div>
    <div className="flexBetween mt-10">

      <p className="font-poppins text-white font-normal text-base minlg:text-xl">Total</p>
      <p className="font-poppins text-white font-normal text-sm minlg:text-xl">{nft.price.toString()} <span className="font-semibold">{nftCurrency}</span></p>
    </div>
  </div>
);

interface NFTDetailsProps {
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
  bussinessLogoUrl: string[];
  businessDescription: string;
  businessCategory: string;
  username: string;
    }

const NFTDetails = () => {
//   const { currentAccount, nftCurrency, buyNFT , isLoadingNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
 
  // const [nft, setNft] = useState<NFTDetailsProps[]>([]);
  const [activeTab, setActiveTab] = useState('comments');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        username: 'User1',
        avatar: 'https://via.placeholder.com/40',
      },
      content: 'This is a comment.',
      replies: [],
    },
    // Add more dummy comments as needed
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [nft, setNft] = useState<NFTDetailsProps>({
    tokenId: 0,
    tokenURI: '',
    seller: '',
    owner: '',
    price: 0,
    sold: false,
    businessDomain: '',
    comments: [],
    upvotes: 0,
    downvotes: 0,
    moderated: false,
    timestamp: 0,
    category: '',
    bussinessLogoUrl: [],
    businessDescription: '',
    businessCategory: '',
    username: '',

  });
  

  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
const pathname = usePathname();
const tokenIDquery = pathname.split('/')[2];
const { signer, contract} = useEthereum();
const {account } = useWallet();
console.log("tokenIDquery:", tokenIDquery, account);

const structuredNFTData = (nftData: NFTDetailsProps) => {
  return {
    tokenId: nftData.tokenId,
    tokenURI: nftData.tokenURI,
    seller: nftData.seller,
    owner: nftData.owner,
    price: nftData.price,
    sold: nftData.sold,
    businessDomain: nftData.businessDomain,
    comments: nftData.comments,
    upvotes: nftData.upvotes,
    downvotes: nftData.downvotes,
    moderated: nftData.moderated,
    timestamp: nftData.timestamp,
    category: nftData.category,
    bussinessLogoUrl: nftData[13],
    businessDescription: nftData.businessDescription,
    businessCategory: nftData.businessCategory,
    username: nftData.username,
  };
};



const fetchData = useCallback(async () => {
    if(signer && contract && account){
        try{
            const nft = await contract.getNFTSDetails(tokenIDquery)
            const getUpvote = await contract.getTotalUpvotes(tokenIDquery);
            const getDownvote = await contract.getTotalDownvotes(tokenIDquery);

            console.log("nft:", nft);

            console.log("getUpvote:", getUpvote.toString());
            console.log("getDownvote:", getDownvote.toString());
            setUpvoteCount(getUpvote.toString());
            setDownvoteCount(getDownvote.toString());
            
            console.log("nft seteeeeeeeeeeeeeeee:", nft);
            console.log("strucrtured nft:", structuredNFTData(nft));
            const structuredNFT = await  structuredNFTData(nft);
            setNft(structuredNFT);
            // setFirstNft(nft[0]);
            setIsLoading(false);
        }catch(err){
            console.log("err:", err);
            setIsLoading(false);
        }
    }
}
, [signer, contract, account, tokenIDquery]);


  useEffect(() => {
    

   
    
    fetchData();
    setIsLoading(false);
  }, [fetchData]);

  const BuyNFT = async () => {
    if(signer && contract){
      try{
        setIsLoading(true);
        const buyingPrice = ethers.parseEther( nft.price.toString());
        const buyNFT = await contract.buyNFT(tokenIDquery,{value: buyingPrice});
        console.log("buyNFT:", buyNFT);
        setIsLoading(false);
      }catch(err){
        console.log("err:", err);
        setIsLoading(false);
      }
    }

    setPaymentModal(false);
    setSuccessModal(true);
  };

  if (isLoading) return (
    <div className=' items-center justify-center flex-col text-center'>
            <div className='relative w-52 h-52'>
                <Loader />
            </div>
          </div>
  );

  console.log("nftddddddddddddddddd:", nft); 


  const handleUpvote = async () => {
    if(signer && contract){
      try{
        const upvote = await  contract.upvoteReview(tokenIDquery);
        console.log("upvote:", upvote);
        setUpvoteCount((prevCount) => prevCount + 1);
      }catch(err){
        console.log("err:", err);
      }
    }
     
    // setUpvoteCount((prevCount) => prevCount + 1);
    // Add logic to update the upvote count in your backend or context state
  };

  const handleDownvote = async () => {
    if(signer && contract){
      try{
        const upvote = await  contract.upvoteReview(tokenIDquery);
        console.log("upvote:", upvote);
        setDownvoteCount((prevCount) => prevCount + 1);
      }catch(err){
        console.log("err:", err);
      }
    }
     
  };

  const handleDeListNFT = async () => {
    if(signer && contract){
      try{
        const listNFT = await  contract.delistNFT(tokenIDquery);
        console.log("listNFT:", listNFT);
       console.log("nft delisted:");
      }catch(err){
        console.log("err:", err);
      }
    }
     
  }

  const handleAddComment = () => {
    if (newCommentText.trim() !== '') {
      // setComments([...comments, { text: newCommentText, user: 'User' }]);
      setComments([...comments, {
        id: comments.length + 1,
        user: {
          username: `User ${comments.length + 1} `,
          avatar: 'https://via.placeholder.com/40',
        },
        content: newCommentText,
        replies: [],
      }]);
      setNewCommentText('');
    }
  };

  const renderComments = (comments: any) => {
    return comments.map((comment: any, index: React.Key | null | undefined) => <Comment key={index} comment={comment}  handleReply={handleReply} />);
  };

  const logComments = () => {
    console.log(comments);
  };

  const handleReply = (replyText, commentId) => {
    // Define the logic for handling the reply
    console.log(`Reply Text: ${replyText}`);
    console.log(`Comment ID: ${commentId}`);
    // Perform other actions based on the reply text and comment ID
  };

  const ownerCheck = () => {
    if (nft.owner == nft.seller) {
        return nft.owner;
    }else{
      return nft.seller 
    } 
  }


  const commentClick = () => {
    setCommentsOpen(!commentsOpen);
    setActiveTab('comments');
  }
  return (
    <div className=' overflow-y-auto' style={{scrollBehavior: 'smooth'}}>
    <div className="relative flex justify-center  min-h-screen">
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col items-center p-2 m-4 mb-32">
      {/* <FontAwesomeIcon icon={faArrowUp}  size='2x'/> */}
      <div className='mb-20 flex p-3 cursor-pointer'>

        <FontAwesomeIcon icon={faArrowUp} size="2x" onClick={handleUpvote} className='mb-60 ' />
        <span className='m-2 select-none'>{upvoteCount}</span>
        </div>
        {/* <FontAwesomeIcon icon={faArrowUpLong} /> */}
        
        {/* <Image src='/arrow.png' width={15} height={15} alt='' /> */}
      </div>


      {/* Downvote arrow */}
      <div className="absolute bottom-1/2 left-4 transform translate-y-1/2 flex flex-col items-center p-2 m-4 mt-16">
      <div className='mb-20 flex p-3 cursor-pointer'>
        <FontAwesomeIcon icon={faArrowDown} size="2x" onClick={handleDownvote} className='mt-30 '/>
        <span className='m-2 select-none '>{downvoteCount}</span>
        </div>
      </div>
      <div className="relative ml-20 flex-1 flex justify-center items-center sm:px-4 p-12 border-r md:border-r-0 md:border-b border-nft-black-1 ">
        <div className="relative w-[557px] mt-[-20%] minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-[557px]">
          <Image
            src={nft.tokenURI}
            objectFit="contain"
            className="rounded-xl shadow-lg ml-3"
            layout="fill"
            // height={100}
            // width={100}
            alt='nft image'
          />
        </div>

      </div>

      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row ">
        <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={nft.bussinessLogoUrl}
                objectFit="cover"
                className="rounded-full"
                alt='nft image'
                layout="fill"

              />
            </div>
          <h2 className="font-poppins text-white  font-semibold text-2xl justify-center items-center align-middle"><span>{nft.username}</span></h2>
        </div>
        <div className="mt-10">
          <p className="font-poppins text-white  text-xs minlg:text-base font-normal">Creator</p>
          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={'/creator1.png'}
                objectFit="cover"
                className="rounded-full"
                alt='nft image'
                layout="fill"

              />
            </div>
            {/* <p className="font-poppins text-white text-xs minlg:text-base font-semibold">{shortenAddress(nft.seller)}</p> */}
            <p className="font-poppins text-white text-xs minlg:text-base font-semibold">{ownerCheck()}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b border-nft-gray-3 flex -flex-row">
            <p className="font-poppins text-white text-base minlg:text-base font-medium mb-2">Details</p>

          </div>
          <div className="mt-3">
            <p className="font-poppins text-white  text-base font-normal">{nft.businessDescription}</p>
          </div>

        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {account === nft.seller.toLowerCase()
            ? (
              <div className="flex flex-row">
              <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border-gray p-2">You cannot buy your own NFT</p>
              <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-xl" onClick={handleDeListNFT}>De List NFT</button>
              </div>
            
              )
            : account === nft.owner.toLowerCase() ? (
              // <Button
              //   btnName="List on MarketPLace"
              //   classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              //   // handleClick={() => router.push(`/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
              // />
              <div className="flex flex-row">
              <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border-gray p-2">You cannot buy your own NFT</p>
              <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-xl" onClick={handleDeListNFT}>De List NFT</button>
              </div>

            ) : (
              // <Button
              //   btnName={`Buy for ${firtsNft.price.toString()} ETH
              //   `}
              //   classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              //   handleClick={() => setPaymentModal(true)}
              // />
              <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-full" onClick={() => setPaymentModal(true)}>Buy for {nft.price.toString()} ETH</button>

            )}

        </div>
        

      {/* </div>
      <div className="flex-1 justify-start flex-row p-12 ">
      <div className='flex flex-col w-full mt-10'>
    <Tabs defaultValue="comments" className="w-full rounded-full">
    <TabsList className="grid w-full grid-cols-3 bg-gray-700 rounded-full">
      <TabsTrigger value="comments" onClick={() => setActiveTab('comments')}>
        Comments
       

      </TabsTrigger>
      
      
    </TabsList>
    <TabsContent value="nfts">
     
      <div>Placeholder for Comments</div>

    </TabsContent>

    </Tabs>
  </div> */}
      </div>
      {paymentModal && (
      <Modal
        header="Check Out"
        body={<PaymentBodyCmp nft={nft} nftCurrency={'ETH'} />}
        footer={(
          <div className="flex flex-row">
            <button
             
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white  mr-5 rounded-xl"
              onClick={BuyNFT}
            >Buy</button>
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
      {isLoading && (
      <Modal
        header="Buying NFT..."
        body={(
          <div className='flex justify-center items-center flex-col text-center'>
            <div className='relative w-52 h-52'>
                <Loader />
            </div>
          </div>

        )}
        footer={(
          <div className="flex justify-center items-center  flex-col">
            <button type="button" className="bg-nft-black-1 text-white font-poppins text-base minlg:text-xl font-semibold p-2 rounded-xl" onClick={() => setPaymentModal(false)}>Cancel</button>
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
              <Image src={nft.tokenURI} objectFit="cover" layout="fill" alt='' />
            </div>

            {/* <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl mt-10">You successfully purchased <span className="font-semibold">{nft.name}</span> from <span className="font-semibold">{shortenAddress(nft.seller)}</span></p> */}
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl mt-10">You successfully purchased <span className="font-semibold">{nft.domain}</span> from <span className="font-semibold">{nft.seller}</span></p>
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
    <div className='flex flex-row w-full mt-10'>
    <Tabs defaultValue="comments" className="w-full rounded-full p-4 justify-center">
    <TabsList className="grid w-full grid-cols-3 bg-gray-700 rounded-xl justify-center items-start text-center">
      <TabsTrigger className='flex justify-center items-center text-center' value="comments" onClick={commentClick}>
        
       

      </TabsTrigger>
      <TabsTrigger className='flex justify-center items-center text-center' value="comments" onClick={commentClick}>
        Comments
       

      </TabsTrigger>
      <TabsTrigger className='flex justify-center items-center text-center' value="comments" onClick={commentClick}>
        
       

      </TabsTrigger>
      
      
    </TabsList>
    <TabsContent value="comments">
      {/* NFTs tab content - Display NFTs */}
      <div>
        {commentsOpen && (
      <div className={`overflow-hidden transition-height duration-500 ${
        commentsOpen ? 'h-auto' : 'h-0'
      }`} >
      <h1>Comment Here </h1>
      <div className="flex justify-start flex-row w-full mt-10 rounded-xl m-4">
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a comment"
          style={{ marginRight: '5px' }}
          className='rounded-xl w-full p-2'
        />
        <button  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white  mr-5 rounded-xl" onClick={handleAddComment}>Comment</button>
      </div>
      {renderComments(comments)}
      <button onClick={logComments}>Log Comments</button>
    </div>
        )}
      </div>

    </TabsContent>

    </Tabs>
  </div>
</div>
      
  );



};

export default NFTDetails;
