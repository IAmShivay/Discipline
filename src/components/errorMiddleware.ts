// src/store/errorMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { setError } from "../redux/app/error/globalErrorSlice";

export const errorMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    if (action?.type.endsWith("/rejected")) {
      // Extract relevant prefix (e.g., 'cases/fetchCases' from 'cases/fetchCases/rejected')
      const actionPrefix = action?.type.split("/")[0]; // Get the first part of the action type
      const actionName = action?.type.split("/")[1]; // Get the second part of the action type

      const readableAction = actionName
        ? `${actionName.charAt(0).toUpperCase() + actionName.slice(1)}`
        : actionPrefix; // Combine or fallback to prefix

      // Construct user-friendly error message
      const errorMessage = action?.payload || "An unknown error occurred";

      // Dispatch enhanced error message
      store.dispatch(setError(`${readableAction} failed: ${errorMessage}`));
    }
    return next(action);
  };
