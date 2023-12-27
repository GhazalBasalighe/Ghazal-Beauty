import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  orderId: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //is item already in cart?
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        // yes ? update its quantity
        existingItem.count = action.payload.count;
      } else {
        //no ? add it
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setOrderId } =
  cartSlice.actions;
export default cartSlice.reducer;
