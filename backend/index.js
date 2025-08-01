import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/auth.route.js';
import cors from 'cors';
import UserRouter from './routes/user.route.js';
import generateContent from './gemini.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true               // ✅ this allows cookies
}));


app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/user', UserRouter);

app.get('/', async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const data = await generateContent(prompt);
    return res.json({ response: data });
  } catch (error) {
    console.error('Error in / route:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});

