import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import localFont from "next/font/local";

type HeaderProps = {
  linkboxes: LinkBoxes;
};

const newake = localFont({
  src: "../fonts/newake.otf",
  variable: "--font-newake",
  weight: "100 900",
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
                        {link.linkText}
                        {link.recentCount !== 0 && (
                          <div className="badge badge-error badge-s">
                            +{link.recentCount}
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  ));

  return (
    <div className="w-full">
      {/* Ligne 1 : Logo + SearchBar */}
      <div className="flex items-center justify-between bg-[#080908] px-10 py-4 h-24">
        <div className="flex items-center">
          <span
            className={`${newake.className} outline text-5xl tracking-wide`}
          >
            KIN
            <span className="neon-outline">
              <span className="inline-block transform scale-x-[-1]">K</span>K
            </span>
            ORNER
          </span>
        </div>
        <div className="w-full max-w-md">
          <SearchBar />
        </div>
      </div>

      {/* Ligne 2 : Menu */}
      <div className="bg-[#0d0d0b] px-10 h-14 flex items-center border-y-2 border-[#1f1e1d] relative">
        <ul className="flex gap-6 text-white h-full">
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
  );
}
