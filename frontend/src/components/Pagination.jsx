import { Button } from '@/components/ui/button';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);
  return (
    <div className="flex gap-2 justify-center mt-4">
      <Button
        size="sm"
        variant="primary"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </Button>
      {pages.map(p => (
        <Button
          key={p}
          size="sm"
          variant={p === page ? 'accent' : 'secondary'}
          className={p === page ? 'font-bold' : ''}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}
      <Button
        size="sm"
        variant="primary"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
} 