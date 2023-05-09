import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer, { ACTIONS } from './reducer';

const initialState = {
  currentUser: null,
  openLogin: false,
  alert: { open: false, severity: 'info', message: '' },
  loading: false,
  profile: { open: false, file: null, photoURL: '' },
};
const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch({ type: ACTIONS.update_user, payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
