// src/redux/slice/Profile/profileThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../../utils/axios';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const response = await get({
      url: 'user/user', // Change this if the endpoint is different
      includeToken: true,
    });
    
    return response;
  }
);
