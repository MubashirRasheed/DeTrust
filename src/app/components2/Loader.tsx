import React from 'react';
import Image from 'next/image';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center w-full my-4">
    <Image src={"/loader.gif"} alt="loader" width={100} height={100} objectFit="contain" />
  </div>
);

export default Loader;
