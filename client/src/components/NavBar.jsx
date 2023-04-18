import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
} from '@mui/material';

import { Lock, Menu } from '@mui/icons-material';
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import { ACTIONS } from '../context/reducer';
// import appLogo from '../assets/bandi_trips.png';

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box>
            <IconButton size="large" color="inherit">
              <Menu sx={{ mr: 1 }} />
            </IconButton>
          </Box>
          {/* 
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box
              component="img"
              sx={{
                height: 128,
                p: 1,
              }}
              alt="Bandi Trips Logo"
              src={appLogo}
            />
          </Box> */}
          {/*Medium & Large screens*/}
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            Bandi Trips
          </Typography>
          {/*Small screens*/}
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            BT
          </Typography>

          {/*Login button*/}

          {!currentUser ? (
            <Button
              color="inherit"
              startIcon={<Lock />}
              onClick={() => dispatch({ type: ACTIONS.open_login })}
            >
              Login
            </Button>
          ) : (
            <UserIcons />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
