import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  notification: null,
  showLogoutModal: false,
  logoutWarned: true,
  showProfileDetailsConfirmModal: false,
  showPasswordDetailsConfirmModal: false,
  showUserMenuModal: false,
  themeMode: 'dark',
};

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
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
    showLogoutModal(state) {
      state.showLogoutModal = true;
    },
    hideLogoutModal(state) {
      state.showLogoutModal = false;
    },
    logoutWarnedTrue(state) {
      state.logoutWarned = true;
    },
    logoutWarnedFalse(state) {
      state.logoutWarned = false;
    },
    showProfileModal(state) {
      state.showProfileDetailsConfirmModal = true;
    },
    hideProfileModal(state) {
      state.showProfileDetailsConfirmModal = false;
    },
    showPasswordModal(state) {
      state.showPasswordDetailsConfirmModal = true;
    },
    hidePasswordModal(state) {
      state.showPasswordDetailsConfirmModal = false;
    },
    toggleUserMenuModal(state) {
      state.showUserMenuModal = !state.showUserMenuModal;
    },
    toggleThemeMode(state) {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
