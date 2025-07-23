import { createSlice } from "@reduxjs/toolkit";
const recalculateTotals = (state) => {
  state.totalQuantity = state.products.reduce((acc, p) => acc + p.quantity, 0);
  state.totalPrice = state.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  state.actualTotal = state.products.reduce((acc, p) => acc + p.originalPrice * p.quantity, 0);
  state.savings = state.totalPrice - state.actualTotal;
  state.shipping = state.totalPrice > 15000 ? 0 : 1000;
  state.total=state.totalPrice+state.shipping;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
    actualTotal:0,
    savings:0,
    shipping:0,
    total:0
  },
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      const existing = state.products.find((p) => p._id === product._id);

      if (existing && existing.quantity<=existing.stock) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: product.quantity || 1 });
      }
      recalculateTotals(state);
      // state.totalQuantity += 1;
      // state.totalPrice += product.price * (product.quantity || 1);
    },
    addProductByQuantity(state, action) {
      const {product,quantity} = action.payload;
      const existing = state.products.find((p) => p._id === product._id);

      if (existing && existing.quantity<=existing.stock) {
        existing.quantity += quantity;
      } else {
        state.products.push({ ...product, quantity: quantity });
      }
recalculateTotals(state);
      // state.totalQuantity += quantity;
      // state.totalPrice += product.price * (quantity);
    },

    removeProduct(state, action) {
      const id = action.payload._id;
      // const existing = state.products.find((p) => p._id === id);
      if (existing) {
        // state.totalQuantity -= existing.quantity;
        // state.totalPrice -= existing.price * existing.quantity;
        state.products = state.products.filter((product) => product._id !== id);
      }
      recalculateTotals(state);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const product = state.products.find((p) => p._id === id);
      if (product && quantity <= product.stock && quantity >= 1) {
        product.quantity = quantity;
      }
      recalculateTotals(state);
      // if (product) {
      //   const quantityDifference = quantity - product.quantity;
      //   product.quantity = quantity;
      //   state.totalQuantity += quantityDifference;
      //   state.totalPrice += quantityDifference * product.price;
      // }
    },
    increaseQuantity(state, action){
      const {id}=action.payload;
      const product = state.products.find((p) => p._id === id);
      if (product && product.quantity<product.stock) {
        product.quantity+=1;
        // state.totalQuantity+=1;
      }
      recalculateTotals(state);
    },
    decreaseQuantity(state, action){
      const {id}=action.payload;
      const product = state.products.find((p) => p._id === id);
      if (product && product.quantity>1) {
        product.quantity-=1;
        // state.totalQuantity-=1;
      }else if (product.quantity === 1) {
      // state.totalQuantity -= 1;
      // state.totalPrice -= product.price;
      state.products = state.products.filter((p) => p._id !== id);
    }
    recalculateTotals(state);
    },

    clearCart(state) {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct,addProductByQuantity, updateQuantity, clearCart,increaseQuantity,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
