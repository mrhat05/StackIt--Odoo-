import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getQuestion, createAnswer, voteAnswer, acceptAnswer } from '@/services/api';
import RichTextEditor from '../components/RichTextEditor';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageSquare, ThumbsUp, CheckCircle, User, Calendar } from 'lucide-react';

export default function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [answerLoading, setAnswerLoading] = useState(false);
  const [answerError, setAnswerError] = useState('');
  const [answerSuccess, setAnswerSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState('');
  const [actionError, setActionError] = useState('');

  const fetchQuestion = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getQuestion(id);
      setQuestion(data);
    } catch (err) {
      setError('Failed to load question');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setAnswerError('');
    setAnswerSuccess('');
    setAnswerLoading(true);
    try {
      await createAnswer(id, {
        description: answerText,
      });
      setAnswerSuccess('Answer posted!');
      setAnswerText('');
      fetchQuestion();
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg && !/token|unauthorized|login/i.test(msg)) {
        setAnswerError(msg);
      } else {
        setAnswerError('');
      }
    } finally {
      setAnswerLoading(false);
    }
  };

  const handleUpvote = async (answerId) => {
    setActionLoading(answerId);
    setActionError('');
    try {
      await voteAnswer(answerId);
      fetchQuestion();
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg && !/token|unauthorized|login/i.test(msg)) {
        setActionError(msg);
      } else {
        setActionError('');
      }
    } finally {
      setActionLoading('');
    }
  };

  const handleAccept = async (answerId) => {
    setActionLoading(answerId);
    setActionError('');
    try {
      await acceptAnswer(answerId);
      fetchQuestion();
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg && !/token|unauthorized|login/i.test(msg)) {
        setActionError(msg);
      } else {
        setActionError('');
      }
    } finally {
      setActionLoading('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="text-red-500 text-lg">{error}</div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
          <span className="text-purple-800 font-medium truncate">{question.title}</span>
        </motion.div>

        {/* Question details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-purple-100"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">{question.title}</h1>
          
          <div className="prose prose-purple max-w-none mb-6" dangerouslySetInnerHTML={{ __html: question.description }} />
          
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              <span>{question.user?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>{new Date(question.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Answers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100"
        >
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">Answers ({question.answers.length})</h2>
          </div>
          
          {question.answers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-purple-200" />
              <p className="text-lg">No answers yet. Be the first to answer!</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {question.answers.map((ans, idx) => (
                <motion.div
                  key={ans._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(`/answer/${ans._id}`)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/answer/${ans._id}`); }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {(ans.user?.name || 'U')[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{ans.user?.name || 'Anonymous'}</div>
                        <div className="text-sm text-gray-500">{new Date(ans.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    {question.acceptedAnswer === ans._id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accepted
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="prose prose-purple max-w-none mb-4" dangerouslySetInnerHTML={{ __html: ans.description }} />
                  
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpvote(ans._id)}
                      disabled={actionLoading === ans._id}
                      className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Upvote ({ans.votes.length})
                    </motion.button>
                    
                    {question.user && question.user._id === (JSON.parse(localStorage.getItem('user'))?._id) && question.acceptedAnswer !== ans._id && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAccept(ans._id)}
                        disabled={actionLoading === ans._id}
                        className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accept Answer
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {actionError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600"
            >
              {actionError}
            </motion.div>
          )}
          
          {/* Answer form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-8 border-t border-purple-200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Answer</h3>
            <form className="space-y-4" onSubmit={handleAnswerSubmit}>
              <RichTextEditor
                value={answerText}
                onChange={setAnswerText}
                placeholder="Write your answer..."
              />
              {answerError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600"
                >
                  {answerError}
                </motion.div>
              )}
              {answerSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600"
                >
                  {answerSuccess}
                </motion.div>
              )}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                  disabled={answerLoading}
                >
                  {answerLoading ? 'Posting Answer...' : 'Submit Answer'}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 