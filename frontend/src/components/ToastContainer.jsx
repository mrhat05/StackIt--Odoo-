import { useState, useEffect } from 'react';
import { Toast, ToastProvider } from '@/components/ui/toast';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', action = '') => {
    const id = ++toastId;
    const newToast = {
      id,
      message,
      type,
      action,
      timestamp: Date.now()
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showLoginToast = (action) => {
    addToast(`Please login to ${action}`, 'warning', action);
  };

  return { addToast, removeToast, showLoginToast, toasts };
};

const ToastContainer = ({ toasts, onRemove }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      default:
        return <Info className="h-5 w-5 text-purple-600" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-green-200';
      case 'error':
        return 'border-red-200';
      case 'warning':
        return 'border-amber-200';
      default:
        return 'border-purple-200';
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-amber-50';
      default:
        return 'bg-purple-50';
    }
  };

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          className={`${getBorderColor(toast.type)} ${getBgColor(toast.type)} animate-in slide-in-from-right-full duration-300`}
          onClose={() => onRemove(toast.id)}
        >
          <div className="flex items-center gap-3">
            {getIcon(toast.type)}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {toast.message}
              </p>
            </div>
          </div>
        </Toast>
      ))}
    </ToastProvider>
  );
};

export default ToastContainer; 