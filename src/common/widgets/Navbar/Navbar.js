import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import * as Icons from 'react-icons/fa';
import logo from "../../../assets/image/logo.png";

const Navbar = () => {
  const navigate = useNavigate(); 
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getIconComponent = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="inline-block ml-2" /> : null;
  };

 

  return (
    <header className="bg-white shadow-md sticky top-0 ">
      <nav className="container mx-auto p-4 md:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-green-600 hover:text-gray-800 font-bold text-lg flex items-center">
            <img src={logo} alt="BookNest Logo" className="w-10 h-10 mr-2" />
            <span className="text-3xl">Keya's Book</span>
          </Link>
          <button className="md:hidden text-3xl text-gray-600" onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Navbar Links */}
        <ul className="hidden md:flex md:space-x-6 items-center">
          <li>
            <Link to="/"className="text-gray-600 hover:text-green-600 transition duration-200">Home</Link>
          </li>
          <li>
            <a href='#books' className="text-gray-600 hover:text-green-600 transition duration-200">Book</a>
          </li>
          <li className="relative group">
            <button 
              onClick={() => toggleDropdown(1)} 
              className="text-gray-600 hover:text-green-600 focus:outline-none transition duration-200"
            >
              Genre
            </button>
            {dropdownIndex === 1 && (
              <ul className="absolute mt-2 bg-white text-gray-700 shadow-md rounded-md py-2 z-10">
                <li><Link to="/genre/a" className="block px-4 py-2 hover:bg-gray-200">a</Link></li>
                <li><Link to="/genre/b" className="block px-4 py-2 hover:bg-gray-200">b</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/wishlist" className="text-gray-600 hover:text-green-600 flex items-center transition duration-200">
              WishList
              {getIconComponent('FaHeart')}
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-full md:w-1/3 ml-6">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
          />
          <button className="bg-green-600 text-white p-3 rounded-r-md hover:bg-green-500 transition duration-200">
            <FiSearch size={20} />
          </button>
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6 text-gray-600">
          <Link to="/wishlist" className="hover:text-green-600 transition duration-200">
            <FiHeart size={24} />
          </Link>
          <Link to="/cart" className="hover:text-green-600 transition duration-200">
            <FiShoppingCart size={24} />
          </Link>
          <Link to="/profile" className="hover:text-green-600 transition duration-200">
            <FiUser size={24} />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 ">
          <div className="relative bg-white w-3/4 max-w-sm mx-auto p-6 mt-16 rounded-lg shadow-lg">
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl focus:outline-none"
              onClick={toggleMenu}
            >
              <FiX />
            </button>
            <ul className="space-y-4 mt-8">
              <li><Link to="/" className="text-gray-600 hover:text-green-600 transition duration-200">Home</Link></li>
              <li><a href='#books' className="text-gray-600 hover:text-green-600 transition duration-200">Book</a></li>
              <li className="relative group">
                <button 
                  onClick={() => toggleDropdown(1)} 
                  className="text-gray-600 hover:text-green-600 focus:outline-none transition duration-200 w-full text-left"
                >
                  Genre
                </button>
                {dropdownIndex === 1 && (
                  <ul className="bg-white text-gray-700 shadow-md rounded-md mt-2 py-2">
                    <li><Link to="/genre/a" className="block px-4 py-2 hover:bg-gray-200">a</Link></li>
                    <li><Link to="/genre/b" className="block px-4 py-2 hover:bg-gray-200">b</Link></li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/wishlist" className="block text-gray-600 hover:text-green-600 transition duration-200">
                  WishList
                  {getIconComponent('FaHeart')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Mobile Search Bar and Icons */}
      <div className="md:hidden w-full p-4 bg-white shadow-md flex justify-between items-center ">
        <div className="flex-1">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
          />
        </div>
        <button className="bg-green-600 text-white p-3 rounded-r-md hover:bg-green-500 transition duration-200">
          <FiSearch size={20} />
        </button>
        <div className="flex items-center space-x-4 ml-4">
          <Link to="/wishlist" className="text-gray-600 hover:text-green-600 transition duration-200">
            <FiHeart size={24} />
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-green-600 transition duration-200">
            <FiShoppingCart size={24} />
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-green-600 transition duration-200">
            <FiUser size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
