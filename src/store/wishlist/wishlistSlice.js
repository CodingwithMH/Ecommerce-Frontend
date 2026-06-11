import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URI = import.meta.env.VITE_BACKEND_URI;
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URI}/wishlist/fetchwishlist`,
        {
        withCredentials: true,
      }
    );
    console.log('wishlist: ', response.data.products)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
    }
  }
);
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (product,thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URI}/wishlist/add`,{product:product._id},
        {
        withCredentials: true,
      }
    );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlisted_products: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlisted_products = action.payload.products;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export default wishlistSlice.reducer