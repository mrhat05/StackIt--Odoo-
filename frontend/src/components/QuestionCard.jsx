import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';

export default function QuestionCard({ question }) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>
          <Link to={`/question/${question._id}`} className="text-primary hover:underline">
            {question.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-700 line-clamp-2 mb-2">{question.description}</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {question.tags.map(tag => (
            <span key={tag} className="bg-secondary text-white px-2 py-0.5 rounded text-xs">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>By {question.user?.name || 'User'}</span>
          <span>{question.answers.length} answers</span>
        </div>
      </CardContent>
    </Card>
  );
} 