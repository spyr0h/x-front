import React from "react";
import Link from "next/link";
import localFont from "next/font/local";

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-inter",
});

type PagingProps = {
  paging: Paging;
};

export default function Paging({ paging }: PagingProps) {
  const { pages, previousPage, nextPage } = paging;

  return (
    <div className="flex items-center justify-center mb-10">
      <div
        className={`join bg-[#0d0d0b] border border-[#1f1e1d] rounded-md overflow-hidden ${inter.className}`}
      >
        <Link
          className={`join-item btn btn-md bg-[#0d0d0b] border-0 text-white hover:bg-[#fb7ec3] hover:text-white transition-colors duration-200 ${
            !previousPage && "opacity-50 pointer-events-none"
          }`}
          href={previousPage ? previousPage.url : ""}
        >
          «
        </Link>
        {pages.map((page, i) => (
          <Link
            key={i}
            className={`join-item btn btn-md border-0 transition-colors duration-200 ${
              page.selected
                ? "bg-[#fb7ec3] text-white pointer-events-none"
                : "bg-[#0d0d0b] text-white hover:bg-[#fb7ec3] hover:text-white"
            }`}
            href={page.url}
          >
            {page.number}
          </Link>
        ))}
        <Link
          className={`join-item btn btn-md bg-[#0d0d0b] border-0 text-white hover:bg-[#fb7ec3] hover:text-white transition-colors duration-200 ${
            !nextPage && "opacity-50 pointer-events-none"
          }`}
          href={nextPage ? nextPage.url : ""}
        >
          »
        </Link>
      </div>
    </div>
  );
}
