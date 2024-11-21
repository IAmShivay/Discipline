import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSnackbar, hideSnackbar } from "../redux/app/error/errorSlice";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const Snackbar: React.FC = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(selectSnackbar);

  useEffect(() => {
    let timeoutId: any;
    if (open) {
      timeoutId = setTimeout(() => {
        dispatch(hideSnackbar());
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open, dispatch]);

  const handleClose = (reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  if (!open) {
    return null;
  }

  const severityConfig = {
    success: {
      icon: CheckCircle,
      classes: "bg-green-50 border-green-500 text-green-800",
      iconColor: "text-green-500",
    },
    error: {
      icon: XCircle,
      classes: "bg-red-50 border-red-500 text-red-800",
      iconColor: "text-red-500",
    },
    warning: {
      icon: AlertCircle,
      classes: "bg-yellow-50 border-yellow-500 text-yellow-800",
      iconColor: "text-yellow-500",
    },
    info: {
      icon: Info,
      classes: "bg-blue-50 border-blue-500 text-blue-800",
      iconColor: "text-blue-500",
    },
  };

  const config = severityConfig[severity || "info"];
  const Icon = config.icon;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-auto max-w-md z-50">
      <div
        className={`${config.classes} flex items-center p-4 rounded-lg shadow-lg border animate-slide-up`}
        role="alert"
      >
        <div className="flex-shrink-0">
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <div className="ml-3 mr-8 text-sm font-medium">{message}</div>
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 ${config.iconColor} hover:bg-opacity-10 hover:bg-gray-500`}
          onClick={() => handleClose()}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
export default Snackbar;