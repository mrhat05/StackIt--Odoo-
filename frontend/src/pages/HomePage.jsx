import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Pagination from '../components/Pagination';
import { getQuestions } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';

function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white/80 shadow-lg p-6 flex flex-col gap-4 animate-pulse min-h-[180px]">
      <div className="h-6 w-2/3 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-100 rounded" />
      <div className="h-4 w-1/2 bg-gray-100 rounded" />
      <div className="flex gap-2 mt-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('newest');
  const [tag, setTag] = useState('');
  const limit = 10;

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getQuestions({
          page,
          limit,
          search: search || undefined,
          sort: filter,
          tag: tag || undefined,
        });
        setQuestions(data.questions);
        setTotal(data.total);
      } catch (err) {
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [page, search, filter, tag]);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 px-2 md:px-6">
      {/* Header and Ask button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2 mb-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Questions</h1>
        <Link to="/ask">
          <Button variant="accent" className="px-6 py-2 text-base font-semibold rounded-lg shadow hover:scale-105 transition cursor-pointer">Ask New Question</Button>
        </Link>
      </div>
      {/* Search and filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="sticky top-2 z-10 bg-white/90 rounded-xl shadow flex flex-col md:flex-row gap-3 md:gap-4 px-4 py-3 mb-2 border border-gray-100 backdrop-blur-md"
      >
        <input
          type="text"
          placeholder="Search questions..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90 text-primary shadow-sm transition-all text-base"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90 text-base"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="unanswered">Unanswered</option>
        </select>
        {/* TODO: Populate with tags from API */}
        <select
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90 text-base"
          value={tag}
          onChange={e => setTag(e.target.value)}
        >
          <option value="">All Tags</option>
        </select>
      </motion.div>
      {/* Questions grid/list */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : error ? (
          <div className="col-span-full bg-white/80 rounded-xl shadow-lg p-8 text-center text-red-500 text-lg">{error}</div>
        ) : questions.length === 0 ? (
          <div className="col-span-full bg-white/80 rounded-xl shadow-lg p-8 text-center text-gray-400 text-lg">No questions yet. Be the first to ask!</div>
        ) : (
          <AnimatePresence>
            {questions.map((q, idx) => (
              <motion.div
                key={q._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: 'easeOut' }}
                className="h-full"
              >
                <QuestionCard question={q} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={Math.ceil(total / limit)}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
} 