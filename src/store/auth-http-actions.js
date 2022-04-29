import { uiActions } from './ui-slice';
import { authActions } from './auth-slice';
import { fetchProfile } from './profile-http-actions';
import store from './index';

const signUpURL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI9U_PK_J6UfDb_b1GP7AMcRY7s1ZNrhQ';
const loginURL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI9U_PK_J6UfDb_b1GP7AMcRY7s1ZNrhQ';
const passwordChangeURL =
  'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDI9U_PK_J6UfDb_b1GP7AMcRY7s1ZNrhQ';
const tokenRefreshURL =
  'https://securetoken.googleapis.com/v1/token?key=AIzaSyDI9U_PK_J6UfDb_b1GP7AMcRY7s1ZNrhQ';

const authHttp = async (dispatch, URL, options = {}) => {
  dispatch(authActions.setIsLoading());
  const httpRequest = async () => {
    const response = await fetch(`${URL}`, options);

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.error.message.replace('_', ' ').toLowerCase();
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  };
  try {
    const data = await httpRequest();
    dispatch(authActions.unSetIsLoading());
    return data;
  } catch (error) {
    dispatch(authActions.unSetIsLoading());
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: `Authentication failed... ${error.message}`,
      })
    );
    return { error: error.message };
  }
};

export const registerUser = (enteredEmail, enteredPassrord) => {
  return async dispatch => {
    const authDetails = await authHttp(dispatch, signUpURL, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassrord,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (authDetails.error) return;
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: `You have successfully registered!`,
      })
    );
    dispatch(authActions.loginUser(authDetails));
  };
};

export const loginUser = (enteredEmail, enteredPassrord) => {
  return async dispatch => {
    const authDetails = await authHttp(dispatch, loginURL, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassrord,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (authDetails.error) return authDetails;
    dispatch(authActions.loginUser(authDetails));
    dispatch(fetchProfile(authDetails));
  };
};

export const changeUserPassword = (newPassword, confirmNewPassword) => {
  return async dispatch => {
    if (newPassword !== confirmNewPassword) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Password Error',
          message: `The two fields has to be the same!`,
        })
      );
      return;
    }
    const { idToken } = store.getState().auth;
    const authDetails = await authHttp(dispatch, passwordChangeURL, {
      method: 'POST',
      body: JSON.stringify({
        idToken,
        password: newPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (authDetails.error) return;
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: `You have successfully changed your password!`,
      })
    );
    dispatch(authActions.userPasswordChange(authDetails));
  };
};

export const refreshUserToken = () => {
  return async dispatch => {
    const { refreshToken } = store.getState().auth;
    const authDetails = await authHttp(dispatch, tokenRefreshURL, {
      method: 'POST',
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (authDetails.error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Something went wrong... Please logout & login again...`,
        })
      );
      return;
    }
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Update',
        message: `Your login status remians. You have one hour before automatic logout!`,
      })
    );
    dispatch(authActions.refreshToken(authDetails));
  };
};
