import { configureStore } from '@reduxjs/toolkit';

// TODO: [FUNCTIONAL] Uncomment when authSlice is ready
// import authReducer from './Slices/authSlice';

export const store = configureStore({
    reducer: {
        // TODO: [FUNCTIONAL] Add reducers here when implemented
        // auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});