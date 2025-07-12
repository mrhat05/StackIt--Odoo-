import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSuccess, loginFailure } from '@/store/authSlice';
import { login } from '@/services/api';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login({ email, password });
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-fuchsia-100 to-white bg-cover bg-center relative overflow-hidden">
      {/* Optional: Add a background image overlay */}
      <div className="absolute inset-0 bg-[url('/src/assets/login-bg.jpg')] bg-cover bg-center opacity-20 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-purple-100 px-8 py-10 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-500 to-purple-400 mb-2">Login</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="text-base"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="text-base"
          />
          {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
          <Button type="submit" className="w-full text-base font-semibold rounded-lg shadow hover:scale-105 transition" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
} 