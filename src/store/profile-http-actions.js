import { profileActions } from './profile-slice';
import { uiActions } from './ui-slice';
import { initialProfileState } from '../lib/profile-utility';
import store from './index';
import { invoicesActions } from './invoices-slice';

const URL = 'https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app';

const profileHttp = async (dispatch, subURL, options = {}) => {
  dispatch(uiActions.setIsLoading());
  const httpRequest = async () => {
    const response = await fetch(`${URL}${subURL}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    const data = await response.json();
    if (data === null) return false;
    return data;
  };
  try {
    const data = await httpRequest();
    dispatch(uiActions.unSetIsLoading());
    return data;
  } catch (error) {
    console.log(error);
    dispatch(uiActions.unSetIsLoading());
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Something went wrong...',
      })
    );
    return { error: error.message };
  }
};

export const fetchProfile = () => {
  return async dispatch => {
    const { userId, idToken } = store.getState().auth;
    const response = await profileHttp(dispatch, `/users/${userId}/profile.json?auth=${idToken}`);
    if (response.error || !response) {
      return;
    }
    dispatch(profileActions.setProfile(response));
    dispatch(invoicesActions.updateInvoiceFormTemplate(response));
  };
};

export const updateProfile = updatedProfile => {
  return async dispatch => {
    const { userId, idToken } = store.getState().auth;
    const response = await profileHttp(dispatch, `/users/${userId}/profile.json?auth=${idToken}`, {
      method: 'PUT',
      body: JSON.stringify(updatedProfile),
    });
    if (response.error || !response) return;
    dispatch(profileActions.setProfile(updatedProfile));
    dispatch(invoicesActions.updateInvoiceFormTemplate(response));
  };
};
