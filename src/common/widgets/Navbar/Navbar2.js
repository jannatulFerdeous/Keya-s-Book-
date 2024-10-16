import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi';
import logo from "../../../assets/image/logo.png";

const Navbar2 = () => {
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    const text = 'Search with Book Title..........';
    let index = 0;

    const typingEffect = setInterval(() => {
      setPlaceholder(text.slice(0, index + 1));
      index++;

      if (index > text.length) {
        setPlaceholder(''); 
        index = 0; 
      }
    }, 150); 

    return () => clearInterval(typingEffect); 
  }, []);

  return (
    <header className="p-5 bg-white shadow-md">
      <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <div className="text-green-600 hover:text-gray-800 font-bold text-lg flex items-center mb-4 md:mb-0">
          <Link to="/">
            <span className="flex items-center text-3xl">
              <img src={logo} alt="BookNest Logo" className="w-8 h-8 mr-2" />
              Keya's Book
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full md:w-1/2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button className="bg-green-600 text-white p-3 rounded-r-md">
            <FiSearch size={20} />
          </button>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-6 text-gray-600">
          <Link to="/wishlist" className="hover:text-green-600">
            <FiHeart size={24} />
          </Link>
          <Link to="/cart" className="hover:text-green-600">
            <FiShoppingCart size={24} />
          </Link>
          <Link to="/profile" className="hover:text-green-600">
            <FiUser size={24} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar2;
