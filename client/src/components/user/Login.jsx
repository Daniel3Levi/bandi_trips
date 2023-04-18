import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { ACTIONS } from '../../context/reducer';
import { Close, Send } from '@mui/icons-material';
import PasswordField from './PasswordField';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import { login, register } from '../../actions/user';

const TITLES = {
  login: 'Login',
  register: 'Register',
};

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();

  const [title, setTitle] = useState(TITLES.login);
  const [isRegister, setIsRegister] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleOnCloseLogin = (e) => {
    dispatch({ type: ACTIONS.close_login });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // test loading componnent
  //   dispatch({ type: ACTIONS.start_loading });
  //   setTimeout(() => {
  //     dispatch({ type: ACTIONS.end_loading });
  //   }, 6000);
  //   //notification test
  //   //check password
  //   const password = passwordRef.current.value;
  //   const confirmPassword = confirmPasswordRef.current.value;
  //   console.log(password, confirmPassword);
  //   if (password !== confirmPassword) {
  //     dispatch({
  //       type: ACTIONS.update_alert,
  //       payload: {
  //         open: true,
  //         severity: 'error',
  //         message: 'Passwords do not match.',
  //       },
  //     });
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // send login request if user exists
    if (!isRegister) return login({ email, password }, dispatch);
    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      dispatch({
        type: ACTIONS.update_alert,
        payload: {
          open: true,
          severity: 'error',
          message: 'Password not match!',
        },
      });
      return;
    }

    // send registertion request
    register({ name, email, password }, dispatch);
  };
  useEffect(() => {
    isRegister ? setTitle(TITLES.register) : setTitle(TITLES.login);
  }, [isRegister]);

  return (
    <Dialog open={openLogin} onClose={handleOnCloseLogin}>
      <DialogTitle>{title}</DialogTitle>

      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={handleOnCloseLogin}
      >
        <Close />
      </IconButton>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            ></TextField>
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          ></TextField>
          <PasswordField
            passwordRef={passwordRef}
            id="password"
            label="Password"
          />{' '}
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: '10px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '20px' }}>
        {isRegister
          ? 'Do you have an account? Sign in Now '
          : 'Don`t you have an account? Create one now '}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? TITLES.login : TITLES.register}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', py: '20px' }}>
        {/* Google */}

        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
