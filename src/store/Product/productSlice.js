import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URI = import.meta.env.VITE_BACKEND_URI;
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URI}/product/fetchall`);
      console.log('first', response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
    }
  }
);
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchProductsByFilters",
  async ({filters},thunkAPI) => {
    const params={
      categories:filters.categories.length>0 ? filters.categories.join(','):undefined,
      rating:filters.rating || undefined,
      priceRange:filters.priceRange || undefined
    }
    try {
      const response = await axios.get(`${BASE_URI}/product/fetch`,{params});
      console.log('first', response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
    }
  }
);
export const fetchProductByID = createAsyncThunk(
  "products/fetchProductById",
  async ({id},thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URI}/product/fetch/${id}`);
      console.log('product', response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
export const fetchProductByCategory = createAsyncThunk(
  "products/fetchProductByCategory",
  async ({category},thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URI}/product/fetchrelated/${category}`);
      console.log('product', response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productById: null,
    filteredProducts:[],
    relatedProducts:[],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
      builder
      .addCase(fetchProductByID.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productById = null;
      })
      .addCase(fetchProductByID.fulfilled, (state, action) => {
        state.loading = false;
        state.productById = action.payload;
      })
      .addCase(fetchProductByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product by ID";
      });
      builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
      builder
      .addCase(fetchProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer