
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { post } from '../../../utils/axios';


interface RegisterData {
  full_name: string;
  phone: string;
  password: string;
}

interface LoginData {
  phone: string;
}

interface AuthState {
  messages: string[];
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  messages: [],
  error: null,
  loading: false,
};

export const registerUser = createAsyncThunk<RegisterData, { full_name: string, phone: string, password: string }, { rejectValue: string[] }>(
  'auth/register',
  async ({ full_name, password, phone }, { rejectWithValue }) => {
    const formdata = new FormData();
    formdata.append("full_name", full_name);
    formdata.append("phone", phone);
    formdata.append("password", password);
    try {
      const response = await post({ url: `register`, data: formdata, includeToken: false });
      return response.messages;
    } catch (error: any) {
      return rejectWithValue(Array.isArray(error) ? error : [error.message]);
    }
  }
);

export const loginUser = createAsyncThunk<LoginData, { phone: string }, { rejectValue: string[] }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    console.log("credentials==>", credentials);

    const formdata = new FormData();
    formdata.append("phone", credentials.phone);
    try {
      const response = await post({ url: `resend-code`, data: formdata, includeToken: false });
      if (response.messages) {
        return response.messages;
      } else {
        return rejectWithValue(["Unexpected response structure"]);
      }
    } catch (error: any) {
      console.log("error=>", error);
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.messages = [];
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string[] | undefined>) => {
        state.loading = false;
        state.error = action.payload ? action.payload.join(', ') : null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.messages = [];
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string[] | undefined>) => {
        state.loading = false;
        state.error = action.payload ? action.payload.join(', ') : null;
      });
  },
});

export default authSlice.reducer;
