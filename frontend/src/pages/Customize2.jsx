import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineArrowLeft } from 'react-icons/ai'; // ⬅️ Arrow icon
import UserDataContext from '../context/UserDataContext';

const Customize2 = () => {
  const { backendImage, selectedImage, userData, setUserData, serverUrl } = useContext(UserDataContext);

  const [assistantname, setassistantname] = useState(userData?.assistantname || '');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('assistantname', assistantname);

      if (backendImage) {
        formData.append('assistantimage', backendImage);
      } else {
        formData.append('imageUrl', selectedImage);
      }

    

      const result = await axios.post(`${serverUrl}/api/v1/user/update`, formData, {
        withCredentials: true,
      });

      // console.log(result.data);
      setUserData(result.data);
      navigate('/');
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px] gap-[20px]'>

      {/* 🔙 Back Arrow */}
      <button
        onClick={() => navigate('/customize')}
        className='absolute top-5 left-5 text-white hover:text-blue-300 transition'
      >
        <AiOutlineArrowLeft size={28} />
      </button>

      <h1 className='text-white text-[40px] text-center'>
        Enter your <span className='text-blue-200'>Assistant Name</span>
      </h1>

      <input
        type='text'
        value={assistantname}
        onChange={(e) => setassistantname(e.target.value)}
        className='max-w-[400px] w-full p-3 border border-gray-300 bg-white bg-opacity-30 text-white placeholder-gray-200 focus:outline-none rounded-full'
        placeholder='eg: Jarvis'
        required
      />

      {assistantname && (
        <button
          className={`min-w-[270px] h-[60px] mt-[30px] font-semibold rounded-full text-[16px] ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-white text-black'
          }`}
          onClick={handleUpdateAssistant}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Finally Create Your Assistant'}
        </button>
      )}
    </div>
  );
};

export default Customize2;
