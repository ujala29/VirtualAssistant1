

import React, { useContext, useEffect, useRef, useState } from 'react';
import userDataContext from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const { userData, serverUrl, setUserData, geminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  const recognitionRef = useRef(null);
  const isRunningRef = useRef(false);

  const [textMode, setTextMode] = useState(false); // 🔁 Toggle for text or voice
  const [textInput, setTextInput] = useState('');
  const [textResponse, setTextResponse] = useState('');
  const [loading, setLoading] = useState(false); // ✅ New loading state

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/v1/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signup");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  const handleCommand = (data, speak = true) => {
    const { type, userInput, response } = data;
    const cleanQuery = userInput
      .replace(/(search|google|on google|please|assistant|open)/gi, '')
      .trim();

    const redirect = () => {
      const encoded = encodeURIComponent(cleanQuery);
      const routes = {
        google_search: `https://www.google.com/search?q=${encoded}`,
        google_open: `https://www.google.com/search?q=${encoded}`,
        calculator_open: `https://www.google.com/search?q=calculator`,
        instagram_open: `https://www.instagram.com/`,
        facebook_open: `https://www.facebook.com/`,
        weather_show: `https://www.google.com/search?q=weather`,
        youtube_search: `https://www.youtube.com/results?search_query=${encoded}`,
        youtube_play: `https://www.youtube.com/results?search_query=${encoded}`,
        linkedin_open: `https://www.linkedin.com/`,
        chatgpt_open: `https://chat.openai.com/`,
        amazon_open: `https://www.amazon.in/`,
        flipkart_open: `https://www.flipkart.com/`,
        wikipedia_open: `https://en.wikipedia.org/wiki/${encoded}`,
        twitter_open: `https://twitter.com/`,
        spotify_open: `https://open.spotify.com/`,
        reddit_open: `https://www.reddit.com/`,
        netflix_open: `https://www.netflix.com/`,
        whatsapp_open: `https://web.whatsapp.com/`,
        zomato_open: `https://www.zomato.com/`,
        swiggy_open: `https://www.swiggy.com/`,
        deepseek_open: `https://www.deepseek.com/`,
        unknown_site: `https://www.${cleanQuery.toLowerCase().replace(/\s+/g, '')}.com/`
      };

      const url = routes[type];
      if (url) window.open(url, '_blank');
    };

    if (speak) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = 'en-US';
      utterance.onend = () => {
        console.log("✅ Speech finished, redirecting now...");
        redirect();
      };
      speechSynthesis.speak(utterance);
    } else {
      setTextResponse(response);
      redirect();
    }
  };

  // ✅ Voice input setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return console.error("SpeechRecognition not supported");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      isRunningRef.current = true;
      console.log("🎤 Recognition started");
    };

    recognition.onend = () => {
      isRunningRef.current = false;
      setTimeout(() => {
        if (!isRunningRef.current) {
          try {
            recognition.start();
          } catch (err) {
            console.warn("Restart failed:", err.message);
          }
        }
      }, 1000);
    };

    recognition.onerror = (event) => {
      console.warn("❌ Recognition error:", event.error);
      isRunningRef.current = false;
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (userData?.assistantname && transcript.toLowerCase().includes(userData.assistantname.toLowerCase())) {
        try {
          const data = await geminiResponse(transcript);
          handleCommand(data);
        } catch (err) {
          console.error("Gemini API error:", err);
        }
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      console.error("Initial start error:", err);
    }

    return () => {
      recognition.stop();
      isRunningRef.current = false;
    };
  }, [userData?.assistantname, geminiResponse]);

  // ✅ Text input submit handler (UPDATED)
  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;

    setLoading(true); // Start loader
    try {
      const data = await geminiResponse(textInput);
      handleCommand(data, false); // ❌ No speech, only text + redirect
    } catch (error) {
      console.error("Gemini API Error:", error);
      setTextResponse("Error occurred while processing your request.");
    }
    setLoading(false); // End loader
  };

return (
  <div className='relative w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex flex-col'>

    {/* ✅ Header Note */}
    <div className="w-full text-center fixed top-0 left-0 bg-[#030353] py-3 shadow-md z-10">
      <p className="text-white text-sm">
        ⚡ Note: The assistant will listen only when you include its name.
      </p>
    </div>

    {/* ✅ Logout */}
    <button
      className="min-w-[150px] h-[60px] text-black font-semibold bg-white rounded-full text-[15px] absolute top-[20px] right-[20px]"
      onClick={handleLogout}>
      Logout
    </button>

    {/* ✅ Customize */}
    <button
      className="min-w-[170px] h-[60px] text-black font-semibold bg-white rounded-full text-[15px] absolute top-[100px] right-[20px]"
      onClick={() => navigate("/customize")}>
      Customize your assistant
    </button>

    {/* ✅ Toggle */}
    <div className="absolute top-[180px] right-[20px]">
      <label className='text-white mr-2'>Mode:</label>
      <select
        value={textMode ? "text" : "voice"}
        onChange={(e) => setTextMode(e.target.value === "text")}
        className="p-2 rounded">
        <option value="voice">Voice</option>
        <option value="text">Text</option>
      </select>
    </div>

    {/* ✅ Main Content with padding for header */}
    <div className="flex flex-col items-center justify-center flex-grow pt-[100px] gap-[20px]">
      
      {/* ✅ Assistant Card */}
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-3xl shadow-lg'>
        <img src={userData?.assistantimage} alt="image" className='h-full object-cover' />
      </div>

      <h1 className='text-white text-[19px] font-semibold'>
        I'm {userData.assistantname}
      </h1>

      {/* ✅ Text Mode Input */}
      {textMode && (
        <div className='flex flex-col gap-2 items-center mt-6'>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Ask me anything..."
            className="w-[300px] p-3 rounded"
          />
          <button
            onClick={handleTextSubmit}
            className={`bg-white text-black px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Submit"}
          </button>
          {loading && (
            <p className="text-white text-sm mt-2 max-w-[300px] text-center">
              🤖 I am processing your request...
            </p>
          )}
          {!loading && textResponse && (
            <p className="text-white text-sm mt-2 max-w-[300px] text-center">
              {textResponse}
            </p>
          )}
        </div>
      )}
    </div>
  </div>
);

export default Home;
