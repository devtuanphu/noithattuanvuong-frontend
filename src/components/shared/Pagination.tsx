import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  basePath,
  searchParams = {}
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${basePath}?${params.toString()}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const showEllipsisThreshold = 7;

    if (totalPages <= showEllipsisThreshold) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Phân trang">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary transition-colors"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Trước</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Trước</span>
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          
          return (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`min-w-[40px] h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white!'
                  : 'text-primary bg-white border border-gray-200 hover:bg-gray-50 hover:border-primary'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary transition-colors"
        >
          <span className="hidden sm:inline">Sau</span>
          <ChevronRight size={18} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
          <span className="hidden sm:inline">Sau</span>
          <ChevronRight size={18} />
        </span>
      )}
    </nav>
  );
}
