import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const user = useSelector(state => state.auth.user);
  if (!user) return <div className="max-w-xl mx-auto mt-12 bg-white/80 rounded-xl shadow-xl p-8 text-center text-gray-500">You are not logged in.</div>;
  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-400 flex items-center justify-center text-3xl font-bold text-white mb-2">
          {user.name?.[0]?.toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  );
} 