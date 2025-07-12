import { Link } from 'react-router-dom';

// Utility to strip HTML and skip images
function getTextPreview(html, maxLength = 120) {
  if (!html) return '';
  // Remove all <img ...> tags
  let noImages = html.replace(/<img[^>]*>/gi, '');
  // Remove all other HTML tags
  let text = noImages.replace(/<[^>]+>/g, '');
  // Convert &nbsp; and other entities
  text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  // Trim and limit length
  text = text.trim();
  if (text.length > maxLength) {
    text = text.slice(0, maxLength).trim() + '...';
  }
  return text || 'No preview available.';
}

export default function QuestionCard({ question }) {
  return (
    <Link to={`/question/${question._id}`} className="block group h-full">
      <div className="h-full flex flex-col justify-between rounded-2xl bg-gradient-to-br from-purple-50/80 via-white/90 to-purple-100/80 border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-200 group-hover:ring-2 group-hover:ring-purple-300 cursor-pointer overflow-hidden">
        <div className="px-5 pt-5 pb-2">
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition line-clamp-2 mb-1">
            {question.title}
          </h2>
          <div className="text-gray-600 text-sm line-clamp-2 mb-3 min-h-[2.5em]">
            {getTextPreview(question.description)}
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {question.tags.map(tag => (
              <span key={tag} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-5 pb-4 pt-2 border-t border-purple-50 bg-white/70 text-xs text-gray-500">
          <span className="truncate max-w-[60%]">By {question.user?.name || 'User'}</span>
          <span className="font-semibold text-purple-600 bg-purple-50 rounded-full px-3 py-1 ml-2 shadow-sm">
            {question.answers.length} {question.answers.length === 1 ? 'answer' : 'answers'}
          </span>
        </div>
      </div>
    </Link>
  );
} 