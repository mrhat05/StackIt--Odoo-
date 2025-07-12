import { Button } from '@/components/ui/button';
import { BellIcon } from '@radix-ui/react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '@/services/api';

export default function Navbar() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications when dropdown opens and user is logged in
  useEffect(() => {
    if (open && user) {
      setLoading(true);
      getNotifications()
        .then(setNotifications)
        .finally(() => setLoading(false));
    }
  }, [open, user]);

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Mark notification as read
  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
    setNotifications((prev) => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
  };

  // Optionally mark all as read when dropdown opens
  useEffect(() => {
    if (open && notifications.some(n => !n.isRead)) {
      notifications.forEach(n => {
        if (!n.isRead) handleMarkAsRead(n._id);
      });
    }
    // eslint-disable-next-line
  }, [open]);

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 text-white shadow-lg">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/logo.svg" alt="StackIt Logo" className="w-8 h-8 drop-shadow-lg" />
          <span className="font-bold text-xl tracking-tight drop-shadow">StackIt</span>
        </Link>
      </div>
      <div className="flex-1 mx-4 max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-lg bg-white/90 text-primary focus:outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all"
        />
      </div>
      <div className="flex items-center gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative p-2 rounded-full hover:bg-purple-100/20 transition group focus-visible:ring-2 focus-visible:ring-accent">
              <BellIcon className="w-6 h-6 text-white group-hover:text-accent transition" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-tr from-fuchsia-500 to-purple-400 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-lg animate-bounce">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="mt-2">
            <div className="font-semibold text-purple-700 mb-2">Notifications</div>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {loading ? (
                <div className="text-gray-400 text-sm">Loading...</div>
              ) : notifications.length === 0 ? (
                <div className="text-gray-400 text-sm">No notifications</div>
              ) : (
                notifications.map(n => (
                  <a
                    key={n._id}
                    href={n.link || '#'}
                    target={n.link ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={e => {
                      if (!n.isRead) handleMarkAsRead(n._id);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg transition-all ${n.isRead ? 'bg-white/80 text-gray-500' : 'bg-purple-50/80 text-purple-900 font-medium shadow-sm'} hover:bg-purple-100/80`}
                  >
                    <span className="flex-1">{n.message}</span>
                    <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {!n.isRead && <span className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse" />}
                  </a>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="font-medium drop-shadow-sm">{user.name}</span>
            <Button variant="secondary" className="rounded-lg shadow hover:scale-105 transition" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="secondary" className="rounded-lg shadow hover:scale-105 transition">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="accent" className="rounded-lg shadow hover:scale-105 transition">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
} 