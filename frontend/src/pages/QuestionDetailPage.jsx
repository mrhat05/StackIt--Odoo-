import { Button } from '@shadcn/ui/button';

export default function QuestionDetailPage() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-2">Home / How to join 2 columns...</div>
      {/* Question details */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold text-primary mb-2">How to join 2 columns in a data set to make a separate column in SQL</h2>
        <div className="text-gray-700 mb-2">I do not know the code for it as I am a beginner. As an example, what I need to do is like this: there is a column 1 containing First name, and column 2 consists of last name. I want a column to combine...</div>
        <div className="flex gap-2 mb-2">
          {/* TODO: Render tags */}
          <span className="bg-secondary text-white px-2 py-0.5 rounded text-xs">SQL</span>
        </div>
        <div className="text-xs text-gray-400">Asked by User Name</div>
      </div>
      {/* Answers */}
      <div className="bg-white rounded shadow p-6 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-primary mb-2">Answers</h3>
        {/* TODO: Map over answers */}
        <div className="border-b pb-2 mb-2">
          <div className="font-medium">Answer 1</div>
          <div className="text-gray-700">The || operator, The CONCAT function...</div>
          <div className="flex gap-2 mt-1">
            <Button size="sm" variant="secondary">Upvote</Button>
            <Button size="sm" variant="accent">Accept</Button>
          </div>
        </div>
        <div className="border-b pb-2 mb-2">
          <div className="font-medium">Answer 2</div>
          <div className="text-gray-700">Details...</div>
          <div className="flex gap-2 mt-1">
            <Button size="sm" variant="secondary">Upvote</Button>
          </div>
        </div>
        {/* Answer form */}
        <form className="flex flex-col gap-2 mt-4">
          {/* TODO: Replace with TipTap rich text editor */}
          <textarea
            placeholder="Submit your answer..."
            className="min-h-[80px] px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" className="self-end">Submit</Button>
        </form>
      </div>
    </div>
  );
} 