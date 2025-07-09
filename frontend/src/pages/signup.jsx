import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Import Link
import bg from '../assets/background.jpg';
import axios from 'axios';
import { toast } from 'react-toastify'; // ✅ Import toast
import  UserDataContext  from '../context/UserDataContext';
import UserContext from '../context/UserContext'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {serverUrl,setUserData}=useContext(UserDataContext)
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${serverUrl}/api/v1/auth/signup`, {
        name,
        email,
        password,
      },{withCredentials:true});
      setUserData(response.data)

      // console.log('User created:', response.data);
      toast.success('Signup successful!');

      setName('');
      setEmail('');
      setPassword('');

      navigate('/customize');
    } catch (error) {
      setUserData(null)
      console.error('Signup failed:', error);
      toast.error('Signup failed. Please try again.');
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
        onSubmit={handleSignup}
        className="relative z-10 bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 p-8 rounded-2xl shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Create Your AI Account</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-white bg-opacity-30 text-white placeholder-gray-200 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>

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
          Sign Up
        </button>

        <p className="text-center text-white mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
