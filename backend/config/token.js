
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const genToken=async(userID)=>{
    try {
        const token=jwt.sign({userID},process.env.JWT_SECRET, {
            expiresIn: '10d' 
        })
        return token;
    } catch (error) {
        console.error('Error generating token:', error.message);
        throw new Error('Token generation failed');
    }
}
export
default genToken;