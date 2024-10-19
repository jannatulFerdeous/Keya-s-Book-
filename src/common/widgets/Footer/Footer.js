import React from 'react';

import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-600 py-4  bottom-0 fixed w-full ">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span className='text-white'>© 2024 Keya's Book.</span>
       
        <div className="flex gap-4">   
          <a href="https://www.facebook.com" target="_blank" >
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-500 text-gray-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300">
              <FaFacebook size={16} />
            </div>
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-500 text-gray-500 hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all duration-300">
              <FaInstagram size={16} />
            </div>
          </a>
          <a href="#" target="_blank" >
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-500 text-gray-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300">
              <FaTwitter size={16} />
            </div>
          </a>
          <a href="https://www.github.com" target="_blank" >
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-500 text-gray-500 hover:bg-green-600 hover:border-green-600 hover:text-white transition-all duration-300">
              <IoLogoWhatsapp size={16} />
            </div>
          </a>
        </div>

        <span className='text-white'>
          Crafted with <span className="text-red-500">&hearts;</span> by Jannatul Ferdeous
        </span>
      </div>
    </footer>
  );
};

export default Footer;
