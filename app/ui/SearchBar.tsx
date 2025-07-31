"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TagIcon,
  UserIcon,
  HashtagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import localFont from "next/font/local";

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-inter",
});

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    suggestions: Suggestion[];
  }>({ suggestions: [] });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(async () => {
        const response = await fetch(
          `https://x-api.ovh/api/full/autocomplete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PUBLIC_API_KEY}`,
            },
            body: JSON.stringify({ value: searchTerm }),
          }
        );

        const data = await response.json();
        console.error(data);
        setSearchResults(data);
        setIsDropdownOpen(true);
      }, 150);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults({ suggestions: [] });
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/videos/search?terms=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const renderIcon = (type: number) => {
    switch (type) {
      case 0:
        return <HashtagIcon className="h-4 w-4 mr-2 text-gray-500" />;
      case 1:
        return <TagIcon className="h-4 w-4 mr-2 text-gray-500" />;
      case 2:
        return <UserIcon className="h-5 w-5 mr-2 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for videos..."
          className={`input input-bordered flex-grow bg-[#0d0d0b] border-[#1f1e1d] border-2 hover:border-[#fb7ec3] focus:outline-none focus:border-[#fb7ec3] transition-colors duration-200 text-white placeholder-gray-400 text-sm ${inter.className}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="btn bg-[#0d0d0b] border-[#1f1e1d] border-2 hover:bg-[#fb7ec3] hover:border-[#fb7ec3] active:bg-[#fb7ec3] focus:outline-none btn-square ml-2"
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="text-gray-300 hover:text-white h-5 w-5" />
        </button>
      </div>

      {isDropdownOpen && (
        <ul className="absolute z-10 left-0 right-0 bg-[#0d0d0b] border border-[#1f1e1d] rounded-lg shadow-lg mt-1 overflow-hidden">
          {searchResults.suggestions.length ? (
            searchResults.suggestions.map((result: Suggestion) => (
              <li
                key={result.value}
                className="hover:bg-[#fb7ec3] hover:text-black cursor-pointer transition-colors duration-200"
              >
                <Link
                  href={result.searchUrl}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setSearchTerm("");
                  }}
                  className="block px-4 py-2 flex items-center text-white"
                >
                  {renderIcon(result.type)}
                  {result.value}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
