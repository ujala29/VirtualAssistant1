import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";

import image1 from "../assets/img1.webp";
import image6 from "../assets/img6.jpg";
import image5 from "../assets/img5.jpeg";
import image4 from "../assets/img4.png";
import image7 from "../assets/img7.webp";
import image3 from "../assets/img3.jpg";

import Card from './components/Card';
import UserDataContext from '../context/UserDataContext';

const Customize = () => {
  const {
    frontedImage,
    setfrontedImage,
    setbackendImage,
    selectedImage,
    setselectedImage
  } = useContext(UserDataContext);

  const InputImage = useRef();
  const navigate = useNavigate();

  const handleimage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setbackendImage(file);
      setfrontedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className='relative w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px] gap-[20px]'>

      {/* 🔙 Back Arrow */}
      <button
        onClick={() => navigate('/')}
        className='absolute top-5 left-5 text-white hover:text-blue-300 transition'
      >
        <AiOutlineArrowLeft size={28} />
      </button>

      <h1 className='text-white text-[40px] text-center'>
        Select your <span className='text-blue-200'>Assistant Image</span>
      </h1>

      <div className='w-[90%] max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
        <Card image={image4} />
        <Card image={image1} />
        <Card image={image6} />
        <Card image={image5} />
        <Card image={image3} />
        <Card image={image7} />

        {/* 📤 Upload Custom Image */}
        <div
          className={`w-[70px] h-[160px] lg:w-[200px] lg:h-[250px] 
          bg-[#030326] rounded-2xl overflow-hidden flex items-center justify-center 
          cursor-pointer border-2 
          ${selectedImage === "input" ? "border-white shadow-blue-500" : "border-[#0000ff1f]"} 
          hover:shadow-2xl hover:shadow-blue-500 hover:border-white`}
          onClick={() => {
            InputImage.current.click();
            setselectedImage("input");
          }}
        >
          {!frontedImage && <BiImageAdd className='text-white h-[35px] w-[35px]' />}
          {frontedImage && <img src={frontedImage} alt="Uploaded" className='h-full w-full object-cover' />}
        </div>

        <input
          type="file"
          accept='image/*'
          ref={InputImage}
          hidden
          onChange={handleimage}
        />
      </div>

      {selectedImage && (
        <button
          className='min-w-[150px] h-[60px] mt-[20px] text-black font-semibold bg-white rounded-full text-[19px]'
          onClick={() => navigate('/customize2')}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
