import React from "react";

type PagingProps = {
  paging: Paging;
};

export default function Paging({ paging }: PagingProps) {
  const { pages, previousPage, nextPage } = paging;

  return (
    <div className="flex items-center justify-center mb-10">
      <div className="join">
        <a
          className={
            "join-item btn btn-md" + (previousPage ? "" : " btn-disabled")
          }
          href={previousPage ? previousPage.url : undefined}
        >
          «
        </a>
        {pages.map((page, i) => (
          <a
            key={i}
            className={
              "join-item btn btn-md" + (page.selected ? " btn-active" : "")
            }
            href={page.url}
          >
            {page.number}
          </a>
        ))}
        <a
          className={"join-item btn btn-md" + (nextPage ? "" : " btn-disabled")}
          href={nextPage ? nextPage.url : undefined}
        >
          »
        </a>
      </div>
    </div>
  );
}
