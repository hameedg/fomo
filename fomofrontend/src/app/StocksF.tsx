'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecentData, selectAllRecentData, getRecentStatus, getRecentError } from './store/Features/stock/stockSlice';
import { AppDispatch, RootState } from './store/store';

const StocksF = ({ symbol }: { symbol: string }) => {
    const dispatch = useDispatch<AppDispatch>();
  const recentData = useSelector(selectAllRecentData);
  const status = useSelector(getRecentStatus);
  const error = useSelector(getRecentError);

  useEffect(() => {
    dispatch(fetchRecentData(symbol));
    const interval = setInterval(() => {
      dispatch(fetchRecentData(symbol));
    }, 10000);

    return () => clearInterval(interval);



  }, [dispatch, symbol]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Cryptocurrency Data</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Rate</th>
            <th className="py-3 px-6 text-left">Volume</th>
            <th className="py-3 px-6 text-left">Market Cap</th>
            <th className="py-3 px-6 text-left">Last Updated</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {recentData.map((crypto) => (
            <tr key={crypto._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{crypto.name}</td>
              <td className="py-3 px-6 text-left">{crypto.rate}</td>
              <td className="py-3 px-6 text-left">{crypto.volume}</td>
              <td className="py-3 px-6 text-left">{crypto.cap}</td>
              <td className="py-3 px-6 text-left">{new Date(crypto.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default StocksF;
