import React, { useContext ,useEffect,useRef} from 'react';
import userDataContext from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const { userData, serverUrl, setUserData,geminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
const recognitionRef = useRef(null);
  const isRunningRef = useRef(false);
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

const handleCommand = (data) => {
  const { type, userInput, response } = data;

  console.log("📦 Received Command:", { type, userInput, response });

  const cleanQuery = userInput
    .replace(/(search|google|on google|please|assistant|open)/gi, '')
    .trim();

  const redirect = () => {
    if (type === 'google_search' || type === 'google_open') {
      const query = encodeURIComponent(cleanQuery);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }

    if (type === 'calculator_open') {
      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }

    if (type === 'instagram_open') {
      window.open(`https://www.instagram.com/`, '_blank');
    }

    if (type === 'facebook_open') {
      window.open(`https://www.facebook.com/`, '_blank');
    }

    if (type === 'weather_show') {
      window.open(`https://www.google.com/search?q=weather`, '_blank');
    }

    if (type === 'youtube_search' || type === 'youtube_play') {
      const query = encodeURIComponent(cleanQuery);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }
     if (type === 'linkedin_open') {
  window.open(`https://www.linkedin.com/`, '_blank');
}

if (type === 'chatgpt_open') {
  window.open(`https://chat.openai.com/`, '_blank');
}
if (type === 'amazon_open') {
  window.open(`https://www.amazon.in/`, '_blank');
}

if (type === 'flipkart_open') {
  window.open(`https://www.flipkart.com/`, '_blank');
}

if (type === 'wikipedia_open') {
  const query = encodeURIComponent(cleanQuery);
  window.open(`https://en.wikipedia.org/wiki/${query}`, '_blank');
}

if (type === 'twitter_open') {
  window.open(`https://twitter.com/`, '_blank');
}

if (type === 'spotify_open') {
  window.open(`https://open.spotify.com/`, '_blank');
}

if (type === 'reddit_open') {
  window.open(`https://www.reddit.com/`, '_blank');
}

if (type === 'netflix_open') {
  window.open(`https://www.netflix.com/`, '_blank');
}

if (type === 'whatsapp_open') {
  window.open(`https://web.whatsapp.com/`, '_blank');
}

if (type === 'zomato_open') {
  window.open(`https://www.zomato.com/`, '_blank');
}

if (type === 'swiggy_open') {
  window.open(`https://www.swiggy.com/`, '_blank');
}
if (type === 'deepseek_open') {
  window.open(`https://www.deepseek.com/`, '_blank');
}

// Fallback: If command is unknown but user says "Open XYZ"
if (type === 'unknown_site') {
  const guessed = cleanQuery.toLowerCase().replace(/\s+/g, '');
  window.open(`https://www.${guessed}.com/`, '_blank');
}

    
  };

  // Speak and redirect after speech ends
  const utterance = new SpeechSynthesisUtterance(response);
  utterance.lang = 'en-US';
  utterance.onend = () => {
    console.log("✅ Speech finished, redirecting now...");
    redirect();
  };
  speechSynthesis.speak(utterance);
};




useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("SpeechRecognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
  recognition.lang='en-US';


    recognition.interimResults = false;

    recognition.onstart = () => {
      isRunningRef.current = true;
      console.log("🎤 Recognition started");
    };

    recognition.onend = () => {
      console.log("⛔ Recognition ended");
      isRunningRef.current = false;

      setTimeout(() => {
        if (!isRunningRef.current) {
          try {
            recognition.start();
          } catch (err) {
            console.warn("Restart failed in onend:", err.message);
          }
        }
      }, 1000);
    };

    recognition.onerror = (event) => {
      console.warn("❌ Recognition error:", event.error);
      isRunningRef.current = false;

      if (event.error !== "not-allowed" && event.error !== "service-not-allowed") {
        setTimeout(() => {
          if (!isRunningRef.current) {
            try {
              recognition.start();
            } catch (err) {
              console.warn("Restart failed in onerror:", err.message);
            }
          }
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("Heard:", transcript);

      if (
        userData?.assistantname &&
        transcript.toLowerCase().includes(userData.assistantname.toLowerCase())
      ) {
        try {
          const data = await geminiResponse(transcript);
          console.log("Gemini Response:", data);
          handleCommand(data)
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







  return (
    <div className='relative w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px] gap-[20px]'>

      {/* ✅ Logout Button */}
      <button
        className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[15px] absolute top-[20px] right-[20px] px-[20px] py-[10px] cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* ✅ Customize Button */}
      <button
        className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[15px] absolute top-[100px] right-[20px] px-[20px] py-[10px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize your assistant
      </button>

      {/* ✅ Assistant Image and Name */}
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-3xl shadow-lg'>
        <img src={userData?.assistantimage} alt="image" className='h-full object-cover' />
      </div>

      <h1 className='text-white text-[19px] font-semibold'>
        I'm {userData.assistantname}
      </h1>
    </div>
  );
};

export default Home;
