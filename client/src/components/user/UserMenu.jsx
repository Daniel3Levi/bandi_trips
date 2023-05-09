import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';
import { ACTIONS } from '../../context/reducer';
import useCheckToken from '../../hooks/useCheckToken';
import Profile from './Profile';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenus }) => {
  useCheckToken();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();

  const handleCloseUserMenu = (e) => {
    setAnchorUserMenus(null);
  };
  const handleClickUserMenu = (e) => {
    setAnchorUserMenus(null);
  };

  // const testAuthorization = async () => {
  //   const url = process.env.REACT_APP_SERVER_URL + '/location';
  //   console.log(url);
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         authorization: `Bearer ${currentUser.token}`,
  //       },
  //     });

  //     const data = await response.json();

  //     console.log(data);
  //     if (!data.success) {
  //       if (response.status === 401)
  //         dispatch({ type: ACTIONS.update_user, payload: null });
  //       throw new Error(data.message);
  //     }
  //   } catch (error) {
  //     dispatch({
  //       type: ACTIONS.update_alert,
  //       payload: {
  //         open: true,
  //         severity: 'error',
  //         message: `Error: ${error.message}`,
  //       },
  //     });

  //     console.log(error);
  //   }
  // };

  const handleClickProfile = () => {
    dispatch({
      type: ACTIONS.update_profile,
      payload: { open: true, file: null, photoURL: currentUser?.photoURL },
    });
  };

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={() => handleCloseUserMenu}
        onClick={() => handleClickUserMenu}
      >
        {!currentUser.google && (
          <MenuItem onClick={handleClickProfile}>
            <ListItemIcon>
              <Settings fontSize="small"></Settings>
            </ListItemIcon>
            Profile
          </MenuItem>
        )}
        <MenuItem
          onClick={() => dispatch({ type: ACTIONS.update_user, payload: null })}
        >
          <ListItemIcon>
            <Logout fontSize="small"></Logout>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;
