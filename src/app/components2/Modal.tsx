import { useRef } from 'react';
import Image from 'next/image';
// import { useTheme } from 'next-themes';

// import images from '../assets';

const Modal = ({ header, body, footer, handleclose }) => {
  const modalRef = useRef(null);
  // const { theme } = useTheme();
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleclose();
    }
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-10 bg-overlay-black animated fadeIn" onClick={handleClickOutside}>
      <div ref={modalRef} className="w-2/5 bg-nft-dark flex flex-col rounded-xl justify-center items-center mx-auto my-auto mt-4">
        <div className="flex justify-end mt-4 mr-4 ">
          <div className="relative w-3 h-3  cursor-pointer" onClick={handleclose}>
            <Image
              src={"/cross.png"}
              layout="fill"
              alt='cross'
  
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-full text-center p-4">
          <h2 className="font-poppins text-white  font-normal text-2xl">{header}</h2>

        </div>
        <div className="p-10  border-t border-b border-nft-black-3 ">
          {body}
        </div>
        <div className="flex justify-center items-center p-4">
          {footer}

        </div>

      </div>

    </div>
  );
};

export default Modal;
