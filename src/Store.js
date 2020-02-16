import React, {createContext, useContext, useReducer} from 'react';

export const AppContext = createContext();

export const Connect = ({ reducer, initialState, children }) =>(
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppContext.Provider>
);

export const useStore = () => useContext(AppContext);