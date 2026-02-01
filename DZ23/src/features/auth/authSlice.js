import { createSlice } from "@reduxjs/toolkit";

const TOKEN_KEY = "token";

const initialState = {
  token: localStorage.getItem(TOKEN_KEY) || null,
  isAuth: Boolean(localStorage.getItem(TOKEN_KEY)),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user || null;
      state.isAuth = true;
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
export { TOKEN_KEY };
