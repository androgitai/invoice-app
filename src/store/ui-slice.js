import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    isLoading: false,
    notification: null,
  },
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    unSetIsLoading(state) {
      state.isLoading = false;
    },
    showNotification(state, action) {
      if (action.payload) {
        state.notification = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        };
      }
      if (!action.payload) state.notification = null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;