import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnswerById } from '@/services/api';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Calendar, MessageSquare } from 'lucide-react';

export default function AnswerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAnswer() {
      setLoading(true);
      setError('');
      try {
        const data = await getAnswerById(id);
        setAnswer(data);
      } catch (err) {
        setError('Failed to load answer');
      } finally {
        setLoading(false);
      }
    }
    fetchAnswer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          >
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-purple-200 rounded-lg w-3/4"></div>
              <div className="h-4 bg-purple-100 rounded w-1/2"></div>
              <div className="h-32 bg-purple-100 rounded-lg"></div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error || !answer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="text-red-500 text-lg">{error || 'Answer not found'}</div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-purple-600 mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span
            className="hover:text-purple-800 cursor-pointer"
            onClick={() => navigate('/')} 
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/'); }}
          >
            Home
          </span>
          <span>/</span>
          <span
            className="hover:text-purple-800 cursor-pointer"
            onClick={() => navigate(`/question/${answer.question?._id}`)}
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/question/${answer.question?._id}`); }}
          >
            {answer.question?.title || 'Question'}
          </span>
          <span>/</span>
          <span className="text-purple-800 font-medium truncate">Answer</span>
        </motion.div>

        {/* Answer details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {(answer.user?.name || 'U')[0].toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                <User className="w-4 h-4 text-purple-500" />
                {answer.user?.name || 'Anonymous'}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                {new Date(answer.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="prose prose-purple max-w-none mb-6" dangerouslySetInnerHTML={{ __html: answer.description }} />
          {answer.images && answer.images.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-6">
              {answer.images.map(img => (
                <img key={img.publicId} src={img.url} alt={img.alt || ''} className="max-w-xs rounded-lg shadow" />
              ))}
            </div>
          )}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-purple-700 font-semibold">
              <MessageSquare className="w-5 h-5" />
              {answer.votes?.length || 0} Upvotes
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 