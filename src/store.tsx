import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/app/auth/authSlice";
import snackbarReducer from "./redux/app/error/errorSlice";
import verifyReducer from "./redux/app/auth/checkAuthSlice";
import employeeReducer from "./redux/app/employees/employeeSlice";
import caseReducer from "./redux/app/cases/caseSlice";
import timelineReducer from "./redux/app/timline/timeline";
import roleReducer from "./redux/app/role/roleSlice";
import notificationReducer from "./redux/app/notification/notificationSlice";
import categorieReducer from "./redux/app/categories/categorieSlice";
import errorReducer from "./redux/app/error/globalErrorSlice";
import {errorMiddleware} from "./components/errorMiddleware";
import userReducer from "./redux/app/auth/userManagementSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    verify: verifyReducer,
    employee: employeeReducer,
    cases: caseReducer,
    timline: timelineReducer,
    roles: roleReducer,
    notificationReducer: notificationReducer,
    categories: categorieReducer,
    error: errorReducer,
    users: userReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
