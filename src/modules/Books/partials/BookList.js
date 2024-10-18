import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { fetchBooks, setPage } from './BookSlice'; 
import { FiHeart } from 'react-icons/fi';

const BookList = () => { 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const { books, currentPage, totalPages, loading, error } = useSelector((state) => state.books); 
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [placeholder, setPlaceholder] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(''); // State for selected subject
  const [subjects, setSubjects] = useState([]); // State for subjects

  useEffect(() => { 
    dispatch(fetchBooks(currentPage)); 
  }, [dispatch, currentPage]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    const text = 'Search Books by their Title..........';
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

  useEffect(() => {
    // Extract unique subjects from the books
    const uniqueSubjects = [...new Set(books.flatMap(book => book.subjects || []))];
    setSubjects(uniqueSubjects);
  }, [books]);

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

  const handleCardClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleAddToWishlist = (book) => {
    const updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isAlreadyWishlisted = updatedWishlist.some((item) => item.id === book.id);

    if (!isAlreadyWishlisted) {
      updatedWishlist.push(book);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
      alert(`${book.title} has been added to your wishlist!`);
    } else {
      alert(`${book.title} is already in your wishlist!`);
    }
  };

  const isBookWishlisted = (bookId) => {
    return wishlist.some((item) => item.id === bookId);
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

  // Filter books based on search term and selected subject
  const filteredBooks = books.filter((book) => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSubject ? book.subjects && book.subjects.includes(selectedSubject) : true) // Filter by selected subject
  );

  return (
    <div className="container mx-auto mt-16 p-6" id="books">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-600 hover:text-green-900 decoration-green-200">Book List</h1>

      <div className="flex flex-col sm:flex-row mb-6">
        {/* Dropdown for subjects */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-full"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooks.map((book) => {
              const isWishlisted = isBookWishlisted(book.id);
              return (
                <div
                  key={book.id}
                  className={`bg-white shadow-md rounded-lg overflow-hidden p-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer ${isWishlisted ? 'border-2 border-red-500' : ''}`}
                  onClick={() => handleCardClick(book.id)}
                >
                  <img
                    src={book.formats['image/jpeg']}
                    alt={book.title}
                    className="w-auto mx-auto h-64 object-cover mb-2"
                  />
                  <h3 className={`text-lg font-semibold mb-1 ${isWishlisted ? 'text-red-700' : 'text-green-700'}`}>
                    {book.title}
                  </h3>
                  <p className="text-red-600 text-sm">By {book.authors.map((author) => author.name).join(', ')}</p>
                  <p className="text-green-600 text-xs mt-1">ID: {book.id}</p>
                  <p className="text-blue-600 text-xs mt-1">Genre: {book.subjects ? book.subjects[0] : 'N/A'}</p>

                  <div className="mt-4">
                    <button className="py-1 px-5 bg-green-500 text-white text-base rounded hover:bg-green-600 transition-colors">
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(book);
                      }}
                      className={`py-2 px-5 ml-4 text-base rounded transition-colors ${isWishlisted ? 'bg-gray-500' : 'bg-red-500'} text-white`}
                    >
                      <FiHeart />
                    </button>
                  </div>
                </div>
              );
            })}
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
