import { Button } from '@shadcn/ui/button';
import { BellIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLoginClick, onLogoutClick, notificationCount }) {
  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-primary text-white shadow-md">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/logo.svg" alt="StackIt Logo" className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">StackIt</span>
        </Link>
      </div>
      <div className="flex-1 mx-4 max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-1 rounded bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="relative">
          <BellIcon className="w-6 h-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-xs rounded-full px-1.5 py-0.5">
              {notificationCount}
            </span>
          )}
        </Button>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="font-medium">{user.name}</span>
            <Button variant="secondary" onClick={onLogoutClick}>Logout</Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={onLoginClick}>Login</Button>
            <Link to="/signup">
              <Button variant="accent">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
} 