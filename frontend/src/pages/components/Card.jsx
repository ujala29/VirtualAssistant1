import React, { useContext } from 'react';
import UserDataContext from '../../context/UserDataContext';

const Card = ({ image }) => {
  const{ setfrontedImage, setbackendImage,selectedImage, setselectedImage}=useContext(UserDataContext);

  return (
    <div
      className={`w-[70px] h-[140px] lg:w-[200px] lg:h-[250px] bg-[#030326] border-2 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500 cursor-pointer 
      ${selectedImage === image ? 'border-white border-2 shadow-blue-500' : 'border-[#0000ff1f]'}`}
      onClick={() => {
        setselectedImage(image)
        setbackendImage(null)
        setfrontedImage(null)
      }}
    >
      <img src={image} alt="Assistant" className='h-full w-full object-cover' />
    </div>
  );
};

export default Card;
