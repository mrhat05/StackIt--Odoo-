import { useState } from 'react';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // TODO: Replace with your backend URL
      await axios.post('/api/auth/register', { name, email, password });
      setLoading(false);
      // TODO: Redirect to login or auto-login
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-primary mb-2">Sign Up for StackIt</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
      </div>
    </div>
  );
} 