import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Product/productSlice'
import cartReducer from './cart/cartSlice'
import userReducer from './user/userSlice'
import wishlistReducer from './wishlist/wishlistSlice'
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  products: productReducer,
  cart:cartReducer,
  user:userReducer,
  wishlist: wishlistReducer
})
const store=configureStore({
    reducer: rootReducer
})
export default store