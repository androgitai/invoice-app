import { uiActions } from './ui-slice';
import { authActions } from './auth-slice';

const signUpURL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI9U_PK_J6UfDb_b1GP7AMcRY7s1ZNrhQ';
const loginURL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI9U_PK_J6UfDb_b1GP7AMcRY7s1ZNrhQ';

const authHttp = async (dispatch, URL, subURL, options = {}) => {
  dispatch(authActions.setIsLoading());
  const httpRequest = async () => {
    const response = await fetch(`${URL}${subURL}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
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
    const authDetails = await authHttp(dispatch, signUpURL, '', {
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
    dispatch(authActions.toggleIsLogin(authDetails));
  };
};
export const loginUser = (enteredEmail, enteredPassrord) => {
  return async dispatch => {
    const authDetails = await authHttp(dispatch, loginURL, '', {
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
    console.log(authDetails);
    if (authDetails.error) return;
    console.log(authDetails);
    dispatch(authActions.loginUser(authDetails));
  };
};
