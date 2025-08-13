"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";

type CategoryLink = {
  count: number;
  linkText: string;
  order: number;
  recentCount: number;
  url: string;
};

type LinkBox = {
  category: number;
  links: CategoryLink[];
  order: number;
  title: string;
};

type CategoriesData = {
  linkboxes: {
    linkboxes: LinkBox[];
  };
  pageLinks: CategoryLink[];
  seoData: {
    canonical: string;
    description: string;
    headline: string;
    isIndexed: boolean;
    recentCount: number;
    title: string;
  };
};

type CategoriesClientProps = {
  data: CategoriesData;
  inter: { className: string };
};

export default function CategoriesClient({
  data,
  inter,
}: CategoriesClientProps) {
  const [sortField, setSortField] = useState<"name" | "count" | "recent">(
    "name"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedCategories = useMemo(() => {
    const sorted = [...data.pageLinks].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.linkText.localeCompare(b.linkText);
          break;
        case "count":
          comparison = a.count - b.count;
          break;
        case "recent":
          comparison = a.recentCount - b.recentCount;
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [data.pageLinks, sortField, sortDirection]);

  const handleSort = (field: "name" | "count" | "recent") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      // Pour count et recent, commencer par desc (plus grand en premier)
      // Pour name, commencer par asc (A à Z)
      setSortDirection(field === "name" ? "asc" : "desc");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050504]">
      <Header linkboxes={data.linkboxes} />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full">
            {/* Title */}
            <h1
              className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white ${inter.className}`}
            >
              {data.seoData.headline}
            </h1>

            {/* Categories */}
            {data.pageLinks && data.pageLinks.length > 0 ? (
              <div className="mb-8">
                <div className="bg-[#0d0d0b] border border-[#1f1e1d] rounded-lg p-6">
                  {/* Sort Buttons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      onClick={() => handleSort("name")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        sortField === "name"
                          ? "bg-[#fb7ec3] text-black"
                          : "bg-[#1f1e1d] text-white hover:bg-[#2a2928]"
                      } ${inter.className}`}
                    >
                      Name{" "}
                      {sortField === "name" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleSort("count")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        sortField === "count"
                          ? "bg-[#fb7ec3] text-black"
                          : "bg-[#1f1e1d] text-white hover:bg-[#2a2928]"
                      } ${inter.className}`}
                    >
                      Number of videos{" "}
                      {sortField === "count" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleSort("recent")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        sortField === "recent"
                          ? "bg-[#fb7ec3] text-black"
                          : "bg-[#1f1e1d] text-white hover:bg-[#2a2928]"
                      } ${inter.className}`}
                    >
                      Most Recent videos{" "}
                      {sortField === "recent" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sortedCategories.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        className={`bg-[#0d0d0b] border border-[#1f1e1d] rounded-md p-4 hover:border-[#fb7ec3]/50 hover:scale-[1.02] transition-all duration-200 ${inter.className}`}
                      >
                        <div className="text-white font-medium text-sm mb-2">
                          {link.linkText
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {link.count} video{link.count !== 1 ? "s" : ""}
                          {link.recentCount > 0 && (
                            <span className="text-[#fb7ec3] ml-2">
                              ({link.recentCount} recent)
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <div className="bg-[#0d0d0b] border border-[#1f1e1d] rounded-lg p-6">
                  <p className={`text-gray-400 text-center ${inter.className}`}>
                    No categories available at the moment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
