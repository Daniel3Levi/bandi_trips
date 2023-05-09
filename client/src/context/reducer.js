export const ACTIONS = {
  open_login: 'OPEN_LOGIN',
  close_login: 'CLOSE_LOGIN',
  start_loading: 'START_LOADING',
  end_loading: 'END_LOADING',
  update_user: 'UPDATE_USER',
  update_alert: 'UPDATE_ALERT',
  update_profile: 'UPDATE_PROFILE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.open_login:
      return { ...state, openLogin: true };

    case ACTIONS.close_login:
      return { ...state, openLogin: false };

    case ACTIONS.start_loading:
      return { ...state, loading: true };

    case ACTIONS.end_loading:
      return { ...state, loading: false };

    case ACTIONS.update_user:
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case ACTIONS.update_alert:
      return { ...state, alert: action.payload };

    case ACTIONS.update_profile:
      return { ...state, profile: action.payload };

    default:
      throw new Error('No mathced action.');
  }
};

export default reducer;
