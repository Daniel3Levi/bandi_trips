import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { ACTIONS } from '../../context/reducer';
import jwtDecode from 'jwt-decode';

const GoogleOneTapLogin = () => {
  const [disabled, setDisabled] = useState(false);

  const { dispatch } = useValue();

  const handleResponse = (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    const { sub: id, email, name, picture: photoURL } = decodedToken;
    dispatch({
      type: ACTIONS.update_user,
      payload: { id, email, name, photoURL, token, google: true },
    });
    dispatch({ type: ACTIONS.close_login });
  };

  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error('Try to clear the cookies or try again later.');
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false);
        }
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.update_alert,
        payload: {
          open: true,
          severity: 'error',
          message: `Error: ${error.message}`,
        },
      });
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Google />}
        disabled={disabled}
        onClick={handleGoogleLogin}
      >
        Login with Google
      </Button>
    </>
  );
};

export default GoogleOneTapLogin;
