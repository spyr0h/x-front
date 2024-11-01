import React from "react";
import Link from "next/link";

type PagingProps = {
  paging: Paging;
};

export default function Paging({ paging }: PagingProps) {
  const { pages, previousPage, nextPage } = paging;

  return (
    <div className="flex items-center justify-center mb-10">
      <div className="join">
        <Link
          className={
            "join-item btn btn-md" + (previousPage ? "" : " btn-disabled")
          }
          href={previousPage ? previousPage.url : ""}
        >
          «
        </Link>
        {pages.map((page, i) => (
          <Link
            key={i}
            className={
              "join-item btn btn-md" + (page.selected ? " btn-active" : "")
            }
            href={page.url}
          >
            {page.number}
          </Link>
        ))}
        <Link
          className={"join-item btn btn-md" + (nextPage ? "" : " btn-disabled")}
          href={nextPage ? nextPage.url : ""}
        >
          »
        </Link>
      </div>
    </div>
  );
}
