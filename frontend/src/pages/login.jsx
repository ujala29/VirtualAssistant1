import React, { useContext, useState } from 'react';
import bg from '../assets/background.jpg';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDataContext from '../context/UserDataContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {serverUrl,setUserData} = useContext(UserDataContext)

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
     const response= await axios.post(`${serverUrl}/api/v1/auth/login`, {
  email,
  password
}, {
  withCredentials: true // ✅ VERY IMPORTANT
});
//"Please send (or allow receiving) cookies with this request." with Crentials true ka mtlb
     setUserData(response.data)
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error('User not found. Redirecting to Sign Up...');
        setUserData(null)
        setTimeout(() => navigate('/signup'), 1500);
      } else {
        toast.error(err.response?.data?.message || 'Login failed');
      }
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 p-8 rounded-2xl shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login to Your AI Account</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-white bg-opacity-30 text-white placeholder-gray-200 focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-white" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-white bg-opacity-30 text-white placeholder-gray-200 focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition duration-200"
        >
          Log In
        </button>

        <p className="text-center text-white mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
