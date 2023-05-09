import React, { useRef } from 'react';
import { useValue } from '../../context/ContextProvider';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';

import { ACTIONS } from '../../context/reducer';
import { updateProfile } from '../../actions/user';

const Profile = () => {
  const {
    state: { profile, currentUser },
    dispatch,
  } = useValue();

  const nameRef = useRef();

  const handleOnCloseProfile = () => {
    dispatch({
      type: ACTIONS.update_profile,
      payload: { ...profile, open: false },
    });
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    //pass user name and photo file to new function in user actions after uploading file to firebase
    updateProfile(currentUser, { name, file: profile.file }, dispatch);
  };

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      dispatch({
        type: ACTIONS.update_profile,
        payload: { ...profile, file, photoURL },
      });
    }
  };
  return (
    <Dialog open={profile.open} onClose={handleOnCloseProfile}>
      <DialogTitle>Profile</DialogTitle>

      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={handleOnCloseProfile}
      >
        <Close />
      </IconButton>

      <form onSubmit={handleSubmitProfile}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating these fields:
          </DialogContentText>
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
            defaultValue={currentUser?.name}
          ></TextField>

          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
              onChange={handleChangePhoto}
            />
            <Avatar
              src={profile.photoURL}
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: '10px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Profile;
