import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 mb-8">
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-1 px-2 py-1 rounded flex items-center ${
            currentPage === 1
              ? 'text-[var(--gray-400)] cursor-not-allowed'
              : 'text-[var(--primary)] hover:bg-[var(--gray-100)]'
          } transition-colors duration-200`}
        >
          <FaChevronLeft className="mr-1" size={10} />
          Prev
        </button>
        
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`mx-1 min-w-[32px] h-8 flex items-center justify-center rounded ${
              currentPage === page
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--gray-700)] hover:bg-[var(--gray-100)]'
            } transition-colors duration-200 text-sm`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`mx-1 px-2 py-1 rounded flex items-center ${
            currentPage === totalPages
              ? 'text-[var(--gray-400)] cursor-not-allowed'
              : 'text-[var(--primary)] hover:bg-[var(--gray-100)]'
          } transition-colors duration-200`}
        >
          Next
          <FaChevronRight className="ml-1" size={10} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;