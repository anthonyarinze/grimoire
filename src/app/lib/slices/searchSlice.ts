import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types";

interface SearchState {
  results: Book[]; // Array to store search results
  selectedBook: Book | null; // Optional: To store the details of a selected book
}

const initialState: SearchState = {
  results: [],
  selectedBook: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Book[]>) => {
      state.results = action.payload;
    },
    setSelectedBook: (state, action: PayloadAction<Book>) => {
      state.selectedBook = action.payload;
    },
  },
});

export const { setSearchResults, setSelectedBook } = searchSlice.actions;
export default searchSlice.reducer;
