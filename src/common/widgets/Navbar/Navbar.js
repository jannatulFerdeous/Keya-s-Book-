import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import * as Icons from 'react-icons/fa';
import logo from "../../../assets/image/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getIconComponent = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="inline-block ml-2" /> : null;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Book', path: '/books' },
    { name: 'WishList', path: '/wishlist', icon: 'FaHeart' },
  ];

  const renderNavItems = () => (
    navItems.map((item, index) => (
      <li key={index} className="relative group">
        <Link to={item.path} className="text-gray-600 hover:text-green-600 transition duration-200 flex items-center">
          {item.name}
          {item.icon && getIconComponent(item.icon)}
        </Link>
      </li>
    ))
  );

  return (
    <header className="bg-white shadow-md fixed top-0 w-full !z-50">
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
          {renderNavItems()}
        </ul>

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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="relative bg-white w-3/4 max-w-sm mx-auto p-6 mt-16 rounded-lg shadow-lg">
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl focus:outline-none"
              onClick={toggleMenu}
            >
              <FiX />
            </button>
            <ul className="space-y-4 mt-8">
              {renderNavItems()}
            </ul>
          </div>
        </div>
      )}

      {/* Mobile Icons */}
      <div className="md:hidden w-full p-4 bg-white shadow-md flex justify-between items-center z-50">
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
