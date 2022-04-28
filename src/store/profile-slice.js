import { createSlice } from '@reduxjs/toolkit';
import { initialProfileState } from '../lib/profile-utility';

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: initialProfileState,
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
