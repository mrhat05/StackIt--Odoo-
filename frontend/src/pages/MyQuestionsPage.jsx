import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getQuestions } from '@/services/api';
import QuestionCard from '../components/QuestionCard';

export default function MyQuestionsPage() {
  const user = useSelector(state => state.auth.user);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMyQuestions() {
      setLoading(true);
      setError('');
      try {
        const data = await getQuestions({ my: true });
        setQuestions(data.questions);
      } catch (err) {
        setError('Failed to load your questions');
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchMyQuestions();
  }, [user]);

  if (!user) return <div className="max-w-xl mx-auto mt-12 bg-white/80 rounded-xl shadow-xl p-8 text-center text-gray-500">You are not logged in.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Questions</h2>
      {loading ? (
        <div className="bg-white/80 rounded-xl shadow p-8 text-center text-gray-400">Loading...</div>
      ) : error ? (
        <div className="bg-white/80 rounded-xl shadow p-8 text-center text-red-500">{error}</div>
      ) : questions.length === 0 ? (
        <div className="bg-white/80 rounded-xl shadow p-8 text-center text-gray-400">You haven't posted any questions yet.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {questions.map(q => <QuestionCard key={q._id} question={q} />)}
        </div>
      )}
    </div>
  );
} 