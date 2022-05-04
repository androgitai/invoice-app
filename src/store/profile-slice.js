import { createSlice } from '@reduxjs/toolkit';
import { profileTemplate } from '../lib/form-templates';

let initialState = { ...profileTemplate };

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: initialState,
  reducers: {
    setProfile(state, action) {
      const newProfile = action.payload;
      for (const key in newProfile) {
        state[key] = newProfile[key];
      }
    },
    clearProfile(state) {
      state.profile = {};
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
