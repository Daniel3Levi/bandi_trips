import { ACTIONS } from '../context/reducer';
import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/user';

export const register = async (user, dispatch) => {
  // start loding
  dispatch({ type: ACTIONS.open_login });

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
