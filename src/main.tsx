import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.tsx";
import Snackbar from "./components/errorSnackbar.tsx";
import MinimalistHRLoader from "./pages/Loading.tsx";
import ErrorSnackbar from "./components/globalerror.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<MinimalistHRLoader />}>
        <App />
        {/* <ErrorSnackbar /> */}
        <Snackbar />
      </Suspense>
    </Provider>
  </StrictMode>
);
