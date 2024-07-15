import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

interface RecentData {
  _id: string;
  name: string;
  rate: number;
  volume: number;
  cap: number;
  timestamp: string;
  __v: number;
}

interface RecentState {
  data: RecentData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RecentState = {
  data: [],
  status: 'idle',
  error: null,
};


export const fetchRecentData = createAsyncThunk(
  'recent/fetchRecentData',
  async (symbol: string) => {
    const response = await axios.get(`http://localhost:5000/api/v1/recent/${symbol}`);
    return response.data;
  }
);

const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecentData.fulfilled, (state, action: PayloadAction<RecentData[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        localStorage.setItem('recentData', JSON.stringify(state.data));
      })
      .addCase(fetchRecentData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const selectAllRecentData = (state: RootState) => state.recent.data;
export const getRecentStatus = (state: RootState) => state.recent.status;
export const getRecentError = (state: RootState) => state.recent.error;

export default recentSlice.reducer;
