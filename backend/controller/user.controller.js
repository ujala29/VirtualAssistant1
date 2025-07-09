import User from '../model/user.schema.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import uploadonCloudinary from '../config/cloundinary.js';
export const getUser = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is set by the isAuth middleware
    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// 

export const updateAssistant = async (req, res) => {
  try {
    const { assistantname, imageUrl } = req.body;
    let assistantimage;

    if (req.file) {
      const normalizedPath = path.resolve(req.file.path);
      assistantimage = await uploadonCloudinary(normalizedPath);
    } else {
      assistantimage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        assistantname,
        assistantimage,
      },
      { new: true }
    ).select('-password');

    return res.status(200).json(user);
  } catch (error) {
    console.error('Assistant upload error:', error.message);
    return res.status(400).json({
      message: 'Assistant upload error',
      error: error.message,
    });
  }
};


import moment from 'moment';

import generateContent from '../gemini.js'; 

export const asktoAssistant = async (req, res) => {
  try {
    const { command } = req.body;

    // Optional safeguard
    if (!command) {
      return res.status(400).json({ response: 'Command is required.' });
    }

    // Validate req.userId exists (must be set via auth middleware)
    if (!req.userId) {
      return res.status(401).json({ response: 'Unauthorized: No user ID found.' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ response: 'User not found.' });
    }

    const assistantname = user.assistantname;
    const name = user.name;

    const result = await generateContent(command, assistantname, name);

    console.log("Gemini raw result:", result);

    // Extract JSON block from result
    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.status(400).json({
        response: "Sorry, I can't understand. Can you please speak again?",
      });
    }

    let gemResult;
    try {
      gemResult = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("Error parsing Gemini result:", err.message);
      return res.status(500).json({ response: "Error parsing response from assistant." });
    }

    const type = gemResult.type;

    switch (type) {
      case 'get-date': {
        const date = moment().format('YYYY-MM-DD');
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `Current date is ${date}`,
        });
      }

      case 'get_time': {
        const time = moment().format('h:mm A');
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `Current time is ${time}`,
        });
      }

      case 'get_day': {
        const day = moment().format('dddd');
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `Today is ${day}`,
        });
      }

      case 'get_month': {
        const month = moment().format('MMMM');
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `Current month is ${month}`,
        });
      }

      case 'google_search':
      case 'youtube_search':
      case 'youtube_play':
      case 'google_open':
      case 'general':
      case 'calculator_open':
      case 'instagram_open':
      case 'facebook_open':
      case 'weather_show': {
        return res.status(200).json({
          type,
          userInput: gemResult.userInput, // ✅ FIXED typo: was `userinput`
          response: gemResult.response,
        });
      }

      default: {
        return res.status(200).json(gemResult); // fallback
      }
    }

  } catch (error) {
    console.error("asktoAssistant error:", error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
