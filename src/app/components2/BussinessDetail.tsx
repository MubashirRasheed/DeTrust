"use client"

import { Input } from "@/components/ui/input"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useCallback, useRef, useState } from "react"

import { toPng,  } from "html-to-image"

import {create } from 'kubo-rpc-client'

import { useEthereum } from "@/contextProvider/smartcontractContext"
import { usePathname } from "next/navigation"

import NFTs from "./NFTs"
import { ethers } from "ethers"


const BussinessDetailTab = ({nftsTokenId}:any) => {
 

    const [activeTab, setActiveTab] = useState(0);
    // const canvasRef = useRef(null);
    const reviewRef = useRef(null);
    const [reviewText, setReviewText] = useState('');
    const [reviewImage, setReviewImage] = useState('')
    const [nftPrice, setNftPrice] = useState(0);
    const [ipfsUrl, setIpfsUrl] = useState('')
    const { signer, contract } = useEthereum();

    // console.log('nft price:', nftPrice);

    const pathname = usePathname();
    const projectId = process.env.NEXT_PUBLIC_NFT_IPFS_PROJECT_ID;
    const projectSecret = process.env.NEXT_PUBLIC_NFT_IPFS_API_KEY_SECRET;
    const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
    
  
   
    
    // const conf = create({
    //   host: 'ipfs.infura.io',
    //   port: 5001,
    //   protocol: 'https',
    //   headers: {
    //     authorization: auth,
    //   },
    // });
    // console.log("conf:", conf);
    const uploadToIPFS2 = async (fileUri) => {
      const subdomain = 'https://cryptosea-nft-marketplace.infura-ipfs.io';
    
      try {
        const fetchforpng = await fetch(fileUri);
        const data = await fetchforpng.blob();
 
            // console.log("fileContent:", data);
      
      
         
          const added = await conf.add({ content: data });
          // console.log("added:", added);
      
            const url = `${subdomain}/ipfs/${added.path}`;
            console.log("url:", url);
            await setIpfsUrl(url);
            await  createReviewNFT(url);

      }
      catch (error) {
        console.error('Error uploading to IPFS:', error);
        return null;
      }
    }

    


   
    

const handleSubmitReview = useCallback( () => {
    if (reviewRef.current === null) {
      return
    }
    // reviewRef.current.style.display = 'block'
    // console.log("reviewRef:", reviewRef.current);
    // changing display to block to make sure the div is visible
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white';
    // loadingOverlay.textContent = 'Loading...'; // You can display loading text or an icon here
    loadingOverlay.innerHTML=`<div role="status">
    <svg aria-hidden="true" class="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>`
    document.body.appendChild(loadingOverlay);
    const elementRef = reviewRef.current;
    const originalStyles = elementRef.style.cssText;
    // console.log("originalStyles:", originalStyles);
    // reviewRef.current.style.display = 'block'
    elementRef.style.cssText += '; display: block; position: static; left: 0; top: 0;';
    // reviewRef.current.style.cssText += '; visibility: hidden; position: static; left: 0; top: 0;';
    // reviewRef.current.style.cssText += '; position: absolute; transform: translate(-9999px, -9999px);';

    toPng(elementRef, { cacheBust: true, })
      .then(async (dataUrl) => {
        elementRef.style.cssText = originalStyles;
        // console.log("dataUrl:", dataUrl);
        // const link = document.createElement('a')
        // link.download = 'my-image-name.png'
        // link.href = dataUrl
        // link.click()
      //  const img = new Image();
        // img.src = dataUrl;
        // document.body.appendChild(img);
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        // link.click()

        // console.log("img:", img.src);
        // Set the generated image to state for displaying



        setReviewImage(dataUrl);
    
        await uploadToIPFS2(dataUrl,auth);
        // console.log('nft price before calling the functuon:', nftPrice)
        // console.log('ipfs before calling the functuon:', ipfsUrl)
        
        document.body.removeChild(loadingOverlay);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [reviewRef,nftPrice, ipfsUrl,uploadToIPFS2])


  
  const createReviewNFT = async (url) => {
    if (signer && contract) {
      try {
        const domain  = pathname.split('/')[2];
  
  // const priceNFT = ethers.formatEther(nftPrice);
  // console.log("nftPrice: in function ", nftPrice);
  // console.log("ipfsurl: in function ", url);
  // console.log("domain: in function ", domain);
  // const priceNFT = ethers.formatEther(nftPrice.toString());
  const priceNFT = nftPrice.toString();
  // console.log("priceNFT:", priceNFT);
  const listingPrice = ethers.parseEther('0.025');
        const tx = await contract.createReviewNFT(url, priceNFT , domain,{value: listingPrice});
        console.log("tx:", tx);
        const receipt = await tx.wait();
        console.log("receipt:", receipt);
      } catch (error) {
        console.error('Error creating NFT:', error);
      }
    }
  };

    
    
    return (
        

<div>
    <Tabs defaultValue="nfts" className="w-full rounded-full">
    <TabsList className="grid w-full grid-cols-3 bg-gray-700 rounded-full">
      <TabsTrigger value="nfts" onClick={() => setActiveTab('nfts')}>
        NFTs
       

      </TabsTrigger>
      
      <TabsTrigger value="myNfts" onClick={() => setActiveTab('myNfts')}>
        My NFTs
      </TabsTrigger>
      <TabsTrigger value="createReview" onClick={() => setActiveTab('createReview')}>
        Create Review
      </TabsTrigger>
    </TabsList>
    <TabsContent value="nfts">
      {/* NFTs tab content - Display NFTs */}
      <div>Placeholder for NFTs</div>
      
      <NFTs nftsTokenId={nftsTokenId} />
     
      
    </TabsContent>
    <TabsContent value="myNfts">
      {/* My NFTs tab content - Display user's NFTs */}
      <div>Placeholder for My NFTs</div>
    </TabsContent>
    <TabsContent value="createReview">
      {/* Create Review tab content */}
      <div>
        <h2>Create Review</h2>

<div>
        <div className="react-flow__node react-flow__node-editorNode nopan selected selectable" data-id="92407e3f-1f35-4f37-8db2-d4518f9bc66b">
  <div className="bg-gray-700 rounded-xl shadow-md px-4 py-3">
    <div className="window">
 
      <div className="node-drag-handle bg-gray-800 rounded-full p-2 flex items-center h-2 w-full">
        <svg viewBox="0 0 420 100" focusable="false" className="chakra-icon" style={{height:'25px',width:'30px'}}>
          <circle fill="#ff5f57" cx="90" cy="50" r="90"></circle>
          <circle fill="#febc2e" cx="250" cy="50" r="90"></circle>
          <circle fill="#28c840" cx="410" cy="50" r="90"></circle>
        </svg>
       
      </div>
      <div className="cm-theme bg-slate-900 mt-2 rounded-xl shadow-md">
        <div className="cm-editor p-2">
          {/* <!-- Replace the following line with your code snippet --> */}
          

          <div className="border rounded-xl p-2 mb-4 shadow-md" id="review-to-image">
            {/* Styling to make textarea resemble a tweet */}
         
          {/* <!-- End of code snippet --> */}
            <textarea
              className="w-full h-40 p-2 resize-none outline-none bg-transparent rounded-xl"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              
            />
          </div>
        

        </div>
      </div>
      <div className="flex w-full relative">
        <Input
          className="w-full h-10 p-2 resize-none outline-none bg-transparent rounded-xl border-2 border-slate-800"  
          placeholder="Price"
          value={nftPrice}
          onChange={(e) => setNftPrice(parseInt(e.target.value))}
        />
{/*         
          <input type='number'  className="w-1/2 h-10 p-2 resize-none outline-none bg-transparent rounded-xl border-2 border-slate-800" placeholder="Price" 
          value={nftPrice}
          onChange={(e) => setNftPrice(parseInt(e.target.value))}

          
          /> */}

        </div>
      <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={handleSubmitReview}
          >
            Submit
          </button>
          
    </div>
    {/* <canvas ref={canvasRef} style={{ display: 'none' }}></canvas> */}


    {/* Hidden div containing the styled review */}
    <div ref={reviewRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                {/* Place your styled elements here */}
                <div className="flex justify-center items-center w-full relative">
    <div className="flex h-[25px]  items-center w-full relative bg-slate-800 rounded-t-full">
      <div className="h-3 w-3 ml-4 rounded-full bg-red-500"></div>
      <div className="h-3 w-3 rounded-full bg-yellow-500 mx-1"></div>
      <div className="h-3 w-3 rounded-full bg-green-500"></div>
    </div>
  </div>
                <div className="bg-gray-700  rounded-xl shadow-md p-4 h-[200px] relative">
    {/* Circles */}
    
    {/* Text entered by the user */}
    <div className="h-[200px] w-full rounded-t-none bg-slate-900 items-center justify-center flex rounded-xl shadow-md absolute top-0 left-0">
      <p className="text-white text-center w-full break-all p-3">
        {reviewText}
      </p>
    </div>
  </div>
            </div>
  </div>
</div>


        </div>
    {/* Display the review image if it exists */}
    {/* {reviewImage && (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Review Image</h2>
            <img src={reviewImage} alt="Review" />
        </div>
    )} */}



</div>

    </TabsContent>
    </Tabs>
       </div>
        )
}

export default BussinessDetailTab