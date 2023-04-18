import { ACTIONS } from '../../context/reducer';

const fetchData = async (
  { url, method = 'POST', token = '', body = null },
  dispatch
) => {
  const headers = token
    ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };

  body = body ? { body: JSON.stringify(body) } : {};

  try {
    const response = await fetch(url, { method, headers, ...body });
    const data = await response.json();

    if (!data.success) {
      if (response.status === 401) {
        dispatch({ type: ACTIONS.update_user, payload: null });
      }
      throw new Error(data.message);
    }
    return data.result;
  } catch (error) {
    dispatch({
      type: ACTIONS.update_alert,
      payload: { open: true, severity: 'error', message: error.message },
    });
    console.log(error);
    return null;
  }
};

export default fetchData;
