"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import localFont from "next/font/local";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type HeaderProps = {
  linkboxes: LinkBoxes;
};

const newake = localFont({
  src: "../fonts/newake.otf",
  variable: "--font-newake",
  weight: "100 900",
});

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-inter",
});

function separateIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  return array.reduce((result: T[][], item: T, index: number) => {
    if (index % chunkSize === 0) {
      result.push([]);
    }
    result[result.length - 1].push(item);
    return result;
  }, []);
}

export default function Header({ linkboxes }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Gérer le scroll du body quand le menu est ouvert
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup au démontage du composant
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toPrintLinkboxes = linkboxes.linkboxes.map((linkbox, i) => (
    <li
      key={i}
      className="dropdown dropdown-hover position-unset z-40 relative h-full"
    >
      <a
        tabIndex={0}
        className="cursor-pointer relative flex items-center h-full px-1
          after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-full
          after:bg-[#fb7ec3] after:scale-x-0 hover:after:scale-x-100
          after:transition-transform after:duration-200 after:origin-left"
      >
        {linkbox.title}
      </a>

      <div className="absolute bg-transparent left-0 w-full rounded-none dropdown-no-anim dropdown-content z-10 p-0 m-0 hover:bg-transparent active:bg-transparent focus:bg-transparent flex">
        <div className="p-0 m-0 bg-[#0d0d0b] flex w-full flex pt-3">
          <ul className="menu xl:menu-horizontal lg:min-w-max m-0">
            {separateIntoChunks(linkbox.links, 4).map((links, j) => (
              <li key={j}>
                <ul>
                  {links.map((link) => (
                    <li key={`${linkbox.category}${j}`}>
                      <Link href={link.url} passHref>
                        {link.linkText
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                        {link.recentCount !== 0 && (
                          <div className="badge badge-error badge-s">
                            +{link.recentCount}
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}

                  {/* All Categories Link - Desktop - Only for Categories menu */}
                  {linkbox.title === "Categories" &&
                    j === separateIntoChunks(linkbox.links, 4).length - 1 &&
                    links.length < 4 && (
                      <li>
                        <Link
                          href="/categories"
                          className="text-[#fb7ec3] hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 font-medium"
                        >
                          All Categories
                        </Link>
                      </li>
                    )}

                  {/* All Pornstars Link - Desktop - Only for Pornstars menu */}
                  {linkbox.title === "Pornstars" &&
                    j === separateIntoChunks(linkbox.links, 4).length - 1 &&
                    links.length < 4 && (
                      <li>
                        <Link
                          href="/pornstars"
                          className="text-[#fb7ec3] hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 font-medium"
                        >
                          All Pornstars
                        </Link>
                      </li>
                    )}
                </ul>
              </li>
            ))}

            {/* All Categories Link - Desktop - Only for Categories menu (new column if last column is full) */}
            {linkbox.title === "Categories" &&
              separateIntoChunks(linkbox.links, 4).length > 0 &&
              separateIntoChunks(linkbox.links, 4)[
                separateIntoChunks(linkbox.links, 4).length - 1
              ].length >= 4 && (
                <li>
                  <ul>
                    <li>
                      <Link
                        href="/categories"
                        className="text-[#fb7ec3] hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 font-medium"
                      >
                        All Categories
                      </Link>
                    </li>
                  </ul>
                </li>
              )}

            {/* All Pornstars Link - Desktop - Only for Pornstars menu (new column if last column is full) */}
            {linkbox.title === "Pornstars" &&
              separateIntoChunks(linkbox.links, 4).length > 0 &&
              separateIntoChunks(linkbox.links, 4)[
                separateIntoChunks(linkbox.links, 4).length - 1
              ].length >= 4 && (
                <li>
                  <ul>
                    <li>
                      <Link
                        href="/pornstars"
                        className="text-[#fb7ec3] hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 font-medium"
                      >
                        All Pornstars
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
          </ul>
        </div>
      </div>
    </li>
  ));

  return (
    <div className="w-full">
      {/* Ligne 1 : Logo + SearchBar/Buttons */}
      <div className="bg-[#080908] py-4 h-24">
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/">
            <div
              className={`
                ${newake.className} 
                text-4xl md:text-5xl
                h-full flex group cursor-pointer 
                pt-[0.25em] md:pt-[0.20em]
              `}
            >
              <span className="outline group-hover:neon-outline">KIN</span>
              <span className="neon-outline">
                <span className="inline-block transform scale-x-[-1]">K</span>K
              </span>
              <span className="outline group-hover:neon-outline -ml-1">
                ORNER
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:block w-full max-w-md">
            <SearchBar />
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="btn btn-ghost btn-square text-white hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-square text-white hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden bg-[#080908] border-t border-[#1f1e1d] px-4 py-3 relative z-50">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block bg-[#0d0d0b] h-14 flex items-center border-y-2 border-[#1f1e1d] relative">
        <div className="container mx-auto px-4 h-full">
          <ul
            className={`flex gap-6 text-white h-full text-sm ${inter.className}`}
          >
            <li className="relative h-full">
              <a
                href="/"
                className="flex items-center h-full px-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-full after:bg-[#fb7ec3] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
              >
                Home
              </a>
            </li>
            <li className="relative h-full">
              <a
                href="/videos/best"
                className="flex items-center h-full px-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-full after:bg-[#fb7ec3] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
              >
                Best of the week
              </a>
            </li>

            {toPrintLinkboxes}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsMenuOpen(false);
            }
          }}
        >
          <div className="fixed right-0 top-0 h-full w-80 bg-[#0d0d0b] shadow-xl transform transition-transform duration-300">
            <div className="flex justify-between items-center p-4 border-b border-[#1f1e1d]">
              <h2
                className={`text-xl font-semibold text-white ${inter.className}`}
              >
                Navigation
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-ghost btn-square text-white hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-y-auto h-full pb-20">
              <ul
                className={`menu p-6 text-white ${inter.className} space-y-2`}
              >
                <li>
                  <Link
                    href="/"
                    className="text-white hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 text-base py-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/videos/best"
                    className="text-white hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 text-base py-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Best of the week
                  </Link>
                </li>

                {linkboxes.linkboxes.map((linkbox, i) => (
                  <li key={i}>
                    <button
                      onClick={() => toggleDropdown(i)}
                      className="text-white hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 w-full flex justify-between items-center text-base py-3"
                    >
                      <span>{linkbox.title}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          openDropdowns.includes(i) ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdowns.includes(i) && (
                      <ul className="ml-6 mt-3 space-y-2">
                        {linkbox.links.map((link, j) => (
                          <li key={j}>
                            <Link
                              href={link.url}
                              className="block text-gray-300 hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 text-sm py-2 px-3 rounded"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {link.linkText
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                              {link.recentCount !== 0 && (
                                <div className="badge badge-error badge-xs ml-2">
                                  +{link.recentCount}
                                </div>
                              )}
                            </Link>
                          </li>
                        ))}

                        {/* All Categories Link - Mobile - Only for Categories menu */}
                        {linkbox.title === "Categories" && (
                          <li className="mt-3 pt-3 border-t border-[#1f1e1d]">
                            <Link
                              href="/categories"
                              className="block text-[#fb7ec3] hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 text-sm py-2 px-3 rounded font-medium"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              All Categories
                            </Link>
                          </li>
                        )}

                        {/* All Pornstars Link - Mobile - Only for Pornstars menu */}
                        {linkbox.title === "Pornstars" && (
                          <li className="mt-3 pt-3 border-t border-[#1f1e1d]">
                            <Link
                              href="/pornstars"
                              className="block text-[#fb7ec3] hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 text-sm py-2 px-3 rounded font-medium"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              All Pornstars
                            </Link>
                          </li>
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
