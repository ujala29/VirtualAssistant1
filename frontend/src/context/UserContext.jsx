import React, { useEffect, useState } from 'react';
import UserDataContext from './UserDataContext';
import axios from 'axios';

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";


  const [userData, setUserData] = useState(null);
  const [frontedImage, setfrontedImage] = useState(null);
  const [backendImage, setbackendImage] = useState(null);
  const [selectedImage, setselectedImage] = useState(null);
  
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/v1/user/current`, {
        withCredentials: true,
      });
      console.log("Current User:", result.data);
      setUserData(result.data);
    } catch (error) {
      console.log("User not logged in or error fetching user:", error.message);
      setUserData(null);
    }
  };

  const geminiResponse = async (command) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );
      //  console.log("🌟 Gemini ka response aaya:", result.data);
      return result.data;
    } catch (error) {
      console.error("Gemini API Error:", error.response?.data || error.message);
      return { type: 'error', response: "Sorry, something went wrong." };
    }
  };

  
  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontedImage,
    setfrontedImage,
    backendImage,
    setbackendImage,
    selectedImage,
    setselectedImage,
    geminiResponse,
    
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
