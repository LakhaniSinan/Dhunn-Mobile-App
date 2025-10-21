import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  id: number;
  full_name: string;
  email: string | null;
  phone: string;
  token: string;
}

interface UserState {
  phoneNumber: string;
  isLoggedIn: boolean;
  token: string;
  userDetails: UserDetails | null; 
}

const initialState: UserState = {
  phoneNumber: "",
  isLoggedIn: false,
  token: '',
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ phoneNumber: string; token: string; userDetails: UserDetails }>
    ) => {
      state.phoneNumber = action.payload.phoneNumber;
      state.token = action.payload.token; 
      state.userDetails = action.payload.userDetails; 
      state.isLoggedIn = true; 
    },
    logoutUser: (state) => {
      state.phoneNumber = "";
      state.token = '';
      state.userDetails = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
