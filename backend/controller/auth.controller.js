import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.schema.js';
import genToken from '../config/token.js';

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = await genToken(user._id);
res.cookie('virtualToken', token, {
    httpOnly: true,
    secure: false,             // ✅ use false for localhost
    sameSite: 'Lax',           // ✅ allows cross-origin cookies
    maxAge: 10 * 24 * 60 * 60 * 1000
});
// console.log("Cookie set:", token);



        return res.status(201).json(
          
            {
            
            _id: user._id,
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        console.error('Error in signup:', error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist." });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = await genToken(existingUser._id);
   res.cookie('virtualToken', token, {
    httpOnly: true,
    secure: false,             // ✅ use false for localhost
    sameSite: 'Lax',           // ✅ allows cross-origin cookies
    maxAge: 10 * 24 * 60 * 60 * 1000
});
// console.log("Cookie set:", token);


    return res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    console.error('Error in login:', error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('virtualToken');
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error('Error in logout:', error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
