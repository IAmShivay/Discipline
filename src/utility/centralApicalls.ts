import { Dispatch } from "redux"; // Import necessary types if using TypeScript
import { loadUser } from "../redux/app/auth/checkAuthSlice";
import { fetchCategories } from "../redux/app/categories/categorieSlice";
import { fetchNotifications } from "../redux/app/notification/notificationSlice";
export const loadData = async (
  dispatch: Dispatch<any>,
  setError: (message: string | null) => void,
  setLoading: (state: boolean) => void
) => {
  try {
    setLoading(true);
    await dispatch(loadUser());
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load user");
  } finally {
    setLoading(false);
  }
};

export const fetchCategorie = async (
  dispatch: Dispatch<any>,
  setError: (message: string | null) => void,
  setLoading: (state: boolean) => void
) => {
  try {
    setLoading(true);
    await dispatch(fetchCategories());
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load categories");
  } finally {
    setLoading(false);
  }
};

export const fetchNotification = async (
  dispatch: Dispatch<any>,
  setError: (message: string | null) => void,
  setLoading: (state: boolean) => void
) => {
  try {
    setLoading(true);
    await dispatch(fetchNotifications());
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to load notifications"
    );
  } finally {
    setLoading(false);
  }
};

// export const fetchNotification = async (
//   dispatch: Dispatch<any>,
//   setError: (message: string | null) => void,
//   setLoading: (state: boolean) => void
// ) => {
//   try {
//     setLoading(true);
//     await dispatch(fetchNotifications());
//   } catch (err) {
//     setError(
//       err instanceof Error ? err.message : "Failed to load notifications"
//     );
//   } finally {
//     setLoading(false);
//   }
// };
// export const fetchNotification = async (
//   dispatch: Dispatch<any>,
//   setError: (message: string | null) => void,
//   setLoading: (state: boolean) => void
// ) => {
//   try {
//     setLoading(true);
//     await dispatch(fetchNotifications());
//   } catch (err) {
//     setError(
//       err instanceof Error ? err.message : "Failed to load notifications"
//     );
//   } finally {
//     setLoading(false);
//   }
// };
// export const fetchNotification = async (
//   dispatch: Dispatch<any>,
//   setError: (message: string | null) => void,
//   setLoading: (state: boolean) => void
// ) => {
//   try {
//     setLoading(true);
//     await dispatch(fetchNotifications());
//   } catch (err) {
//     setError(
//       err instanceof Error ? err.message : "Failed to load notifications"
//     );
//   } finally {
//     setLoading(false);
//   }
// };
// export const fetchNotification = async (
//   dispatch: Dispatch<any>,
//   setError: (message: string | null) => void,
//   setLoading: (state: boolean) => void
// ) => {
//   try {
//     setLoading(true);
//     await dispatch(fetchNotifications());
//   } catch (err) {
//     setError(
//       err instanceof Error ? err.message : "Failed to load notifications"
//     );
//   } finally {
//     setLoading(false);
//   }
// };
