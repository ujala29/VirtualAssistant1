import React, { useEffect, useState } from 'react';
import UserDataContext from './UserDataContext';
import axios from 'axios';

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:3000";


  const [userData, setUserData] = useState(null);
  const [frontedImage, setfrontedImage] = useState(null);
  const [backendImage, setbackendImage] = useState(null);
  const [selectedImage, setselectedImage] = useState(null);

//   userData: Info about the logged-in user (like name, email, etc.)

// frontedImage: Image shown to the user on frontend

// backendImage: Image saved or returned from backend

// selectedImage: The image currently selected by user
  
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
// This runs once when the app loads.

// It fetches the logged-in user info from backend using handleCurrentUser().
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


// “I created a UserContext to globally store and manage important data like the logged-in user, image states, and assistant API response. When the app loads, it checks if a user is logged in using a /current endpoint. This helps me avoid prop drilling and lets me use these values in any component. I also added a function to send commands to the assistant (Gemini) via backend using Axios. This way, I can easily get responses from the assistant without cluttering my components with API calls. The context also handles image states for frontend display and backend storage, making it easier to manage user interactions with images.”