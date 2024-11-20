import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/app/auth/authSlice";
import snackbarReducer from "./redux/app/error/errorSlice";
import verifyReducer from "./redux/app/auth/checkAuthSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer,
        verify: verifyReducer,

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;