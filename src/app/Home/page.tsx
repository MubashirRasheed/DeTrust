"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';

type ImageCard = {
  imageUrl: string;
  category: string;
  description: string;
};

const IndexPage = () => {
  const [imageCards, setImageCards] = useState<ImageCard[]>([
    {
      imageUrl: 'https://i.imgur.com/HXvgmAe.png',
      category: 'Category 1',
      description: 'Description 1',
    },
    {
      imageUrl: 'https://i.imgur.com/HXvgmAe.png',
      category: 'Category 2',
      description: 'Description 2',
    },
    {
        imageUrl: 'https://i.imgur.com/HXvgmAe.png',
        category: 'Category 2',
        description: 'Description 2',
      },
      
    // Add more image cards as needed
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading delay
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the delay
    }, 2000); // Simulated delay of 2 seconds, adjust as needed

    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {imageCards.map((card, index) => (
        <div key={index} className="max-w-md mx-auto bg-gray-900 shadow-md rounded-xl overflow-hidden m-4 relative">
          {/* Image */}
          {!loading ? (
            <Image
              src={card.imageUrl}
              alt={`Card Image ${index + 1}`}
              className="w-full h-64 object-cover object-center rounded-xl"
                width={100}
                height={100}
            />
          ) : (
            <div className="w-full h-64 bg-gray-800"></div> // Skeleton Loading for Image
          )}

          {/* Content */}
          <div className="p-4">
            {!loading ? (
              <>
                {/* Actual content */}
                <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-200">{card.category}</span>
                <p className="text-gray-300 mt-2">{card.description}</p>
              </>
            ) : (
              <>
                {/* Skeleton Loading for Category Badge & Description */}
                <div className="w-24 h-6 mb-2 bg-gray-700 animate-pulse"></div>
                <div className="h-4 bg-gray-700 animate-pulse"></div>
                <div className="h-4 my-2 bg-gray-700 animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-700 animate-pulse"></div>
              </>
            )}
          </div>

          {/* Clickable overlay for the entire card */}
          <a href="YOUR_LINK_URL" className="absolute inset-0"></a>
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
