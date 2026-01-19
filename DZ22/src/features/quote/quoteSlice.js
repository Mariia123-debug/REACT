import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRandomQuote = createAsyncThunk(
  "quote/fetchRandomQuote",
  async (_, { rejectWithValue }) => {
    try {
        //не смогла проверить с https://zenquotes.io/api/random
        // ошибка: [{"q":"Too many requests. Obtain an auth key for unlimited access.","a":"zenquotes.io","h":"Too many requests. Obtain an auth key for unlimited access @ zenquotes.io"}]
      const { data } = await axios.get("https://dummyjson.com/quotes/random");
      // dummyjson возвращает объект вида:
      // { id, quote, author }
      return { quote: data.quote, author: data.author };
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Request failed";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  quote: "",
  author: "",
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quote = action.payload.quote;
        state.author = action.payload.author;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      });
  },
});

export default quoteSlice.reducer;