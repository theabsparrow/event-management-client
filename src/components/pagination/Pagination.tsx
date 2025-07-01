"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?page=${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?page=${currentPage + 1}`);
    }
  };
  return (
    <div className="flex items-center justify-center gap-2 font-inter mt-10 mb-10">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center gap-1 font-semibold  
          ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          }
        `}
      >
        <FaChevronLeft /> Prev
      </button>

      {/* Page Number Buttons */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={pageNumber}
            onClick={() => {
              setCurrentPage(index + 1);
              router.push(`${pathname}?page=${index + 1}`);
            }}
            className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold border cursor-pointer
              ${
                currentPage === pageNumber
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        className={`px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center gap-1 font-semibold 
          ${
            currentPage === totalPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          }
        `}
      >
        Next <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
