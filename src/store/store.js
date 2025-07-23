import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Product/productSlice'
import cartReducer from './cart/cartSlice'
import userReducer from './user/userSlice'
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  products: productReducer,
  cart:cartReducer,
  user:userReducer
})
const store=configureStore({
    reducer: rootReducer
})
export default store