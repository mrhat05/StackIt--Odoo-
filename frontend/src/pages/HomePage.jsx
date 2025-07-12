import { Button } from '@shadcn/ui/button';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-primary">Questions</h1>
        <Link to="/ask">
          <Button variant="accent">Ask New Question</Button>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search questions..."
          className="flex-1 px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select className="px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Newest</option>
          <option>Unanswered</option>
        </select>
        <select className="px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Tags</option>
          {/* TODO: Populate with tags */}
        </select>
      </div>
      <div className="flex flex-col gap-4">
        {/* TODO: Map over questions and render QuestionCard components */}
        <div className="bg-white rounded shadow p-6 text-center text-gray-400">
          No questions yet. Be the first to ask!
        </div>
      </div>
      {/* TODO: Pagination */}
    </div>
  );
} 