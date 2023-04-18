import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({
  passwordRef,
  id = 'password',
  label = 'Password',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <>
      <TextField
        margin="normal"
        variant="standard"
        id={id}
        label={label}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        inputRef={passwordRef}
        inputProps={{ minLength: 6 }}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleVisibility}
                onMouseDown={handleMouseDown}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </>
  );
};

export default PasswordField;
