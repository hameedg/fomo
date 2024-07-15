import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import recentReducer from "./Features/stock/stockSlice"

const rootReducer = combineReducers({
  recent: recentReducer,
});


export const store = configureStore({
  reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;