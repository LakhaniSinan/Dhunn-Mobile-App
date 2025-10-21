import store from '../../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../User/userSlice';
import { post } from '../../../utils/axios';
import { setItem } from '../../../utils/localStorage';

interface VerifyCodeData {
  phone: string;
  code: string;
}

interface OtpState {
  messages: string[];
  error: string | null;
  loading: boolean;
}

const initialState: OtpState = {
  messages: [],
  error: null,
  loading: false,
};

export const verifyCode = createAsyncThunk<VerifyCodeData, { phone: string, otp: string }, { rejectValue: string[] }>(
  'auth/verifyCode',
  async ({ phone, otp }, { rejectWithValue }) => {
    const formdata = new FormData();
    formdata.append("phone", phone);
    formdata.append("code", otp);
    try {
      const response = await post({ url: `verify-code`, data: formdata, includeToken: false });
      const userData = response.data.user;
      console.log('userData==>',userData);
      
      store.dispatch(
        loginUser({
          phoneNumber: userData.phone,
          token: userData.token,
          userDetails: {
            id: userData.id,
            full_name: userData.full_name,
            email: userData.email_verified_at,
            phone: userData.phone,
            token: userData.token,
          },
        })
      );
      setItem("token", userData.token);
      setItem("userDetails", userData);
      return { phone, code: otp };
    } catch (error: any) {
      return rejectWithValue(Array.isArray(error) ? error : [error.message]);
    }
  }
);

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.messages = [];
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(verifyCode.rejected, (state, action: PayloadAction<string[] | undefined>) => {
        state.loading = false;
        state.error = action.payload ? action.payload.join(', ') : null;
      });
  },
});

export default otpSlice.reducer;
