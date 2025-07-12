import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const Toast = React.forwardRef(({ className, children, onClose, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border border-purple-200 bg-white p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
      className
    )}
    {...props}
  >
    {children}
    <button
      onClick={onClose}
      className="absolute right-2 top-2 rounded-md p-1 text-purple-500 opacity-0 transition-opacity hover:text-purple-700 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
));
Toast.displayName = "Toast";

const ToastProvider = ({ children }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {children}
    </div>
  );
};

export { Toast, ToastProvider }; 