import React from "react";

type PagingProps = {
  paging: Paging;
};

export default function Paging({ paging }: PagingProps) {
  const { pages, previousPage, nextPage } = paging;

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Chevron Left */}
      <a
        href={previousPage ? previousPage.url : undefined}
        className={`p-2 rounded ${
          previousPage ? "text-blue-600" : "text-gray-400 cursor-not-allowed"
        }`}
        aria-disabled={!previousPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </a>

      {/* Page Numbers */}
      {pages.map((page) => (
        <div
          key={page.number}
          className="flex items-center justify-center w-12"
        >
          {page.selected ? (
            <span className="p-2 border rounded bg-gray-200 text-gray-500 cursor-default w-full text-center">
              {page.number}
            </span>
          ) : (
            <a href={page.url} className="text-blue-600 w-full text-center">
              {page.number}
            </a>
          )}
        </div>
      ))}

      {/* Chevron Right */}
      <a
        href={nextPage ? nextPage.url : undefined}
        className={`p-2 rounded ${
          nextPage ? "text-blue-600" : "text-gray-400 cursor-not-allowed"
        }`}
        aria-disabled={!nextPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
  );
}
