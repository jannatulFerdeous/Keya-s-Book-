import React, { useState } from 'react';
import Navbar from './Navbar';
import BookList from './BookList';

const BookPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Navbar onSearch={handleSearchChange} />
      <BookList searchTerm={searchTerm} />
    </div>
  );
};

export default BookPage;
