import { createSlice } from "@reduxjs/toolkit";

const CART_KEY = "petshop_cart";

function getCartCount() {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, x) => sum + Number(x?.qty || 0), 0);
  } catch {
    return 0;
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: getCartCount(),
  },
  reducers: {
    refreshCount(state) {
      state.count = getCartCount();
    },
  },
});

export const { refreshCount } = cartSlice.actions;
export default cartSlice.reducer;