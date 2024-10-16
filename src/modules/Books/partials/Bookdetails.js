import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Bookdetails = () => {
  const { id } = useParams(); // Get the book ID from the route 
  const { books } = useSelector((state) => state.books); 
  const [book, setBook] = useState(null); 
 
  useEffect(() => { 
    // Find the book with the matching ID from the books list 
    const selectedBook = books.find((book) => book.id === parseInt(id)); 
    setBook(selectedBook); 
  }, [id, books]); 
 
  if (!book) { 
    return <div className="text-center text-lg mt-10">Loading...</div>; 
  } 
 
  return ( 
    <div className="container mx-auto p-6 mb-32 mt-28 bg-white shadow-lg rounded-lg max-w-4xl"> 
      <div className="flex flex-col md:flex-row items-center mb-8"> 
        <img 
          src={book.formats['image/jpeg']} 
          alt={book.title} 
          className="w-64 h-full object-cover rounded-lg shadow-lg mb-4 md:mb-0 md:mr-8" 
        /> 
        <div className="flex-1"> 
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{book.title}</h1> 
          <p className="text-xl text-gray-600 mb-2">
            <span className="font-semibold text-green-600">By: </span> 
            {book.authors.map((author) => author.name).join(', ')}
          </p> 
          <p className="text-lg text-gray-500">
            <span className="font-semibold text-blue-600">Genre: </span>
            {book.subjects ? book.subjects.join(', ') : 'N/A'}
          </p>
        </div> 
      </div>

      <div className="border-t border-gray-300 pt-6"> 
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Description</h2> 
        <p className="text-lg text-gray-600 leading-relaxed">
          {book.description ? book.description : 'No description available for this book.'}
        </p>
      </div>

      <div className="mt-8">
        <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition-all duration-300 ease-in-out">
          Add to Cart
        </button>
        <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 ml-4 transition-all duration-300 ease-in-out">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Bookdetails;
