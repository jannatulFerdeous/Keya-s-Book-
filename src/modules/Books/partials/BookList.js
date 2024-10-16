import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { fetchBooks, setPage } from './BookSlice'; 
import { FiHeart } from 'react-icons/fi';

const BookList = () => { 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const { books, currentPage, totalPages, loading, error } = useSelector((state) => state.books); 
 
  useEffect(() => { 
    dispatch(fetchBooks(currentPage)); 
  }, [dispatch, currentPage]);

  const handleNextPage = () => { 
    if (currentPage < totalPages) { 
      dispatch(setPage(currentPage + 1)); 
    } 
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const goToPage = (page) => {
    dispatch(setPage(page));
  };

  // Navigate to Bookdetails when a card is clicked
  const handleCardClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const generatePagination = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push('...');
      }

      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="container mx-auto p-6 " id="books" >
      <h1 className="text-4xl font-bold mb-6 text-center text-green-600 hover:text-green-900 decoration-green-200">Book List</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleCardClick(book.id)} // Trigger navigation on card click
              >
                <img
                  src={book.formats['image/jpeg']}
                  alt={book.title}
                  className="w-auto mx-auto h-64 object-cover mb-2"
                />
                <h3 className="text-lg text-green-700 font-semibold mb-1">{book.title}</h3>
                <p className="text-red-600 text-sm">By {book.authors.map((author) => author.name).join(', ')}</p>
                <p className="text-green-600 text-xs mt-1">ID: {book.id}</p>
                <p className="text-blue-600 text-xs mt-1">Genre: {book.subjects ? book.subjects[0] : 'N/A'}</p>

                <div className="mt-4">
                  <button className="py-1 px-5 bg-green-500 text-white text-base rounded hover:bg-green-600 transition-colors">
                    Add to Cart
                  </button>
                  <button className="py-2 px-5 ml-4 text-base bg-red-500 text-white rounded hover:bg-pink-500 transition-colors">
                    <FiHeart />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 transition-colors ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            >
              Previous
            </button>

            <div className="flex flex-wrap justify-center space-x-2">
              {generatePagination().map((page, index) =>
                page === '...' ? (
                  <span key={index} className="py-2 px-4 text-gray-600">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`py-2 px-4 rounded ${page === currentPage ? 'bg-green-600 text-white' : 'bg-gray-300 hover:bg-gray-400 transition-colors'}`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 transition-colors ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;
