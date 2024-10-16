import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (page = 1) => {
  const response = await axios.get(`https://gutendex.com/books?page=${page}`);
  return {
    books: response.data.results,
    totalPages: Math.ceil(response.data.count / 32),
  };
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload.books;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});

export const { setPage } = bookSlice.actions;
export default bookSlice.reducer;
