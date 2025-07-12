import { Button } from '@/components/ui/button';
import { BellIcon, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Modern nav link style
  const navLinkClass =
    'block md:inline px-4 py-2 rounded-full font-semibold text-white/90 hover:text-white bg-white/0 hover:bg-purple-400/30 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white';

  // Mobile nav links
  const navLinks = (
    <>
      <Link to="/" className={navLinkClass + ' text-base'} onClick={() => setMobileMenuOpen(false)}>Home</Link>
      <Link to="/my-questions" className={navLinkClass + ' text-base'} onClick={() => setMobileMenuOpen(false)}>My Questions</Link>
      <Link to="/profile" className={navLinkClass + ' text-base'} onClick={() => setMobileMenuOpen(false)}>Profile</Link>
    </>
  );

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 text-white shadow-lg relative">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/logo.jpg" alt="StackIt Logo" className="w-10 h- drop-shadow-lg" />
          <span className="font-bold text-xl tracking-tight drop-shadow">StackIt</span>
        </Link>
      </div>
      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-2">
        {navLinks}
      </div>
      {/* Spacer for mobile right icons */}
      <div className="flex-1 md:hidden" />
      {/* Notification bell and hamburger (mobile) */}
      <div className="flex items-center gap-2 md:gap-4">
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
        {/* Hamburger icon on mobile (rightmost) */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* User actions (desktop) */}
      <div className="hidden md:flex items-center gap-2 ml-2">
        {user ? (
          <>
            <span className="font-medium drop-shadow-sm">{user.name}</span>
            <Button variant="secondary" className="rounded-lg shadow hover:scale-105 transition" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="secondary" className="rounded-lg shadow hover:scale-105 transition">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="accent" className="rounded-lg shadow hover:scale-105 transition">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 shadow-2xl z-50 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3 px-4 py-6">
            {navLinks}
            {user ? (
              <div className="flex flex-col gap-2 mt-2">
                <span className="font-medium drop-shadow-sm text-white">{user.name}</span>
                <Button variant="secondary" className="rounded-lg shadow hover:scale-105 transition w-full" onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login">
                  <Button variant="secondary" className="rounded-lg shadow hover:scale-105 transition w-full">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="accent" className="rounded-lg shadow hover:scale-105 transition w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 