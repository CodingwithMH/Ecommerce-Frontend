import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URI = import.meta.env.VITE_BACKEND_URI;
export const fetchUser = createAsyncThunk(
  "api/auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URI}/api/auth/getuser`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log('first', error.response?.data)
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    token: "",
    loading: true,
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});
export const { setToken, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
