import { toast } from 'react-toastify';
import { Lock } from 'lucide-react';

export function showLoginToast() {
  toast.warn(
    <span className="flex items-center gap-3">
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 mr-2">
        <Lock className="w-5 h-5" />
      </span>
      <span>Please login to use this feature</span>
    </span>,
    {
      style: {
        background: 'white',
        color: '#3b0764',
        fontWeight: 600,
        fontSize: '1.1rem',
        borderRadius: '0.75rem',
        borderLeft: '8px solid #a21caf',
        boxShadow: '0 4px 24px 0 rgba(124,58,237,0.15)',
        minWidth: '320px',
      },
      progressStyle: {
        background: '#a21caf',
      },
      icon: false,
    }
  );
} 