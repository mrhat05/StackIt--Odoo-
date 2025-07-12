import { useState } from 'react';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';

export default function AskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to submit question
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-primary mb-2">Ask a Question</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        {/* TODO: Replace with TipTap rich text editor */}
        <textarea
          placeholder="Description (you can use rich text here)"
          className="min-h-[120px] px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Posting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
} 