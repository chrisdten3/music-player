import React from 'react';
import { loginEndpoint } from '../spotify';
import { FaSpotify } from 'react-icons/fa';

const Login = () => {
  return (
    <div className='flex flex-col items-center h-screen justify-center pt-10 text-white'>
      <FaSpotify className='text-9xl mb-4' /> {/* Increase the icon size */}
      <div className='pt-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
        <a href={loginEndpoint}>Login with Spotify</a> 
        </button>
      </div>
    </div>
  );
};

export default Login;