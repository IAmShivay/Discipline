// src/store/errorMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { setError } from "../redux/app/error/globalErrorSlice";

export const errorMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    if (action?.type.endsWith("/rejected")) {
      // Construct user-friendly error message
      const errorMessage = action?.payload || "An unknown error occurred";

      // Dispatch enhanced error message
      store.dispatch(setError(` ${errorMessage}`));
    }
    return next(action);
  };
