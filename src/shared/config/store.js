import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../../modules/Books/partials/BookSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
