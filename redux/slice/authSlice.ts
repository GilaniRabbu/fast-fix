/* eslint-disable */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  user: {
    _id?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicture?: {
      url: string;
      altText: string;
    };
    [key: string]: any;
  } | null;
};

const initialState: TAuthState = {
  user: {
    _id: "",
    phone: "",
    firstName: "",
    lastName: "",
    email: "",

    role: "", // ✅ Default role in initial state
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: {
          _id?: string;
          phone?: string;
          firstName?: string;
          lastName?: string;
          email?: string;
          profilePicture?: {
            url: string;
            altText: string;
          };
          role?: string; // ✅ Also added to payload type

          [key: string]: any;
        };
      }>
    ) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout, removeUser } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { auth: TAuthState }) =>
  state.auth.user;

// ✅ Optional: Selector to get role
export const selectUserRole = (state: { auth: TAuthState }) =>
  state.auth.user?.role || null;
