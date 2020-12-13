import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../utils/api/api';

export const fetchNewsIds = createAsyncThunk('news/fetchNewsIds', async () => {
  const response = await api.getNewStoriesIds();
  return response;
})

const initialState = {
  newsIds: [],
  statusNewsIds: 'idle',
  errorNewsIds: null
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNewsIds.pending]: (state, action) => {
      state.statusNewsIds = 'loading';
    },
    [fetchNewsIds.fulfilled]: (state, action) => {
      state.statusNewsIds = 'succeeded';
      state.newsIds = action.payload;
    },
    [fetchNewsIds.rejected]: (state, action) => {
      state.statusNewsIds = 'failed';
      state.errorNewsIds = action.error.message;
    }
  }
})

export default newsSlice.reducer;

export const selectNewsIds = state => state.news.newsIds;
export const selectNewsIdsError = state => state.news.errorNewsIds;
export const selectNewsIdsStatus = state => state.news.statusNewsIds;
