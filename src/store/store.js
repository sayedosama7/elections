import { configureStore } from '@reduxjs/toolkit';
import { FetchCanditate } from './FetchCanditate';

export const store = configureStore({
    reducer: {
        [FetchCanditate.reducerPath]: FetchCanditate.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(FetchCanditate.middleware),
});
