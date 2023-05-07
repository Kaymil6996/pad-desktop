import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/user';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { todosApi } from './rtk/todos';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(todosApi.middleware);
  },
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
