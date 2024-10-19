import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter((book) => book.id !== bookId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };


  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-600">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg overflow-hidden p-2 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleBookClick(book.id)} 
            >
              <img
                src={book.formats['image/jpeg']}
                alt={book.title}
                className="w-auto mx-auto h-64 object-cover mb-2"
              />
              <h3 className="text-lg text-green-700 font-semibold mb-1">{book.title}</h3>
              <p className="text-red-600 text-sm">By {book.authors.map((author) => author.name).join(', ')}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleRemoveFromWishlist(book.id);
                }}
                className="py-1 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
