import { ACTIONS } from '../context/reducer';
import fetchData from './utils/fetchData';
import { v4 as uuidv4 } from 'uuid';
import uploadFile from '../firebase/uploadFile';

const url = process.env.REACT_APP_SERVER_URL + '/user';

export const register = async (user, dispatch) => {
  // start loding
  dispatch({ type: ACTIONS.start_loading });

  //send fetch request
  const result = await fetchData(
    { url: url + '/register', body: user },
    dispatch
  );

  if (result) {
    dispatch({ type: ACTIONS.update_user, payload: result });
    dispatch({ type: ACTIONS.close_login });
    dispatch({
      type: ACTIONS.update_alert,
      payload: {
        open: true,
        severity: 'success',
        message: 'User Created Successfully!',
      },
    });
  }
  //end loading
  dispatch({ type: ACTIONS.end_loading });
};

export const login = async (user, dispatch) => {
  // start loding
  dispatch({ type: ACTIONS.open_login });

  //send fetch request
  const result = await fetchData({ url: url + '/login', body: user }, dispatch);

  if (result) {
    dispatch({ type: ACTIONS.update_user, payload: result });
    dispatch({ type: ACTIONS.close_login });
    dispatch({
      type: ACTIONS.update_alert,
      payload: {
        open: true,
        severity: 'success',
        message: 'User LogedIn Successfully!',
      },
    });
  }
  //end loading
  dispatch({ type: ACTIONS.end_loading });
};

export const updateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: ACTIONS.start_loading });

  const { name, file } = updatedFields;

  let body = { name };
  try {
    if (file) {
      // update image to firebase
      const imageName = uuidv4() + '.' + file?.name?.split('.').pop();
      const photoURL = await uploadFile(
        file,
        `profile/${currentUser?.id}/${imageName}`
      );
      body = { ...body, photoURL };
    }
    const result = await fetchData(
      {
        url: url + '/updateProfile',
        method: 'PATCH',
        body,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: ACTIONS.update_user,
        payload: { ...currentUser, ...result },
      });
      dispatch({
        type: ACTIONS.update_alert,
        payload: {
          open: true,
          severity: 'success',
          message: 'User Updated Successfully!',
        },
      });
      dispatch({
        type: ACTIONS.update_profile,
        payload: { open: false, file: null, photoURL: result.photoURL },
      });
    }
  } catch (error) {
    dispatch({
      type: ACTIONS.update_alert,
      payload: {
        open: true,
        severity: 'error',
        message: error.message,
      },
    });
    console.log(error);
  }
  dispatch({ type: ACTIONS.end_loading });
};
