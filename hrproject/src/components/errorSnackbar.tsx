import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSnackbar, hideSnackbar } from '../redux/app/error/errorSlice';
import { XCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Snackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity }:any = useSelector(selectSnackbar);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideSnackbar());
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [open, dispatch]);

  const handleClose = (event?: React.MouseEvent | React.KeyboardEvent) => {
    if (event?.type === 'click') {
      dispatch(hideSnackbar());
    }
  };

  if (!open) return null;

  const severityConfig:any = {
    error: {
      icon: <XCircle className="h-5 w-5" />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200'
    },
    success: {
      icon: <CheckCircle className="h-5 w-5" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    warning: {
      icon: <AlertCircle className="h-5 w-5" />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    },
    info: {
      icon: <Info className="h-5 w-5" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    }
  };

  const config:any = severityConfig[severity] || severityConfig.info;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform z-50">
      <div 
        className={`flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg 
          ${config.bgColor} ${config.textColor} ${config.borderColor}`}
        role="alert"
      >
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="text-sm font-medium">
          {message}
        </div>
        <button
          onClick={handleClose}
          className={`ml-4 inline-flex rounded-lg p-1.5 
            hover:bg-opacity-20 hover:bg-black focus:outline-none`}
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;