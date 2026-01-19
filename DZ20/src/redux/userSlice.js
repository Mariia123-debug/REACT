import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    { id: 1, name: "Anna", email: "anna@mail.com", city: "Linz" },
    { id: 2, name: "Michael", email: "michael@mail.com", city: "Wien" },
    { id: 3, name: "Maria", email: "maria@mail.com", city: "Graz" },
  ],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default userSlice.reducer;