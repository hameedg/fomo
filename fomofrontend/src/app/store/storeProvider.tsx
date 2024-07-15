'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

const StoreProvider = ({ children }:{children:React.ReactNode}) => {
  useEffect(() => {
    const storedData = localStorage.getItem('recentData');
    if (storedData) {
      store.dispatch({ type: 'recent/fetchRecentData/fulfilled', payload: JSON.parse(storedData) });
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
