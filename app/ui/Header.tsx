import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Image from "next/image";

type HeaderProps = {
  linkboxes: LinkBoxes;
};

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
  const pornstars = linkboxes.linkboxes[1].links.map((link) => (
    <li key={`${linkboxes.linkboxes[1].category}${link.order}`}>
      <Link href={link.url} passHref>
        {link.linkText} ({link.count})
      </Link>
    </li>
  ));
  const listedPornstars = separateIntoChunks(pornstars, 4).map((chunk, i) => (
    <li key={i}>
      <ul>{chunk.map((element) => element)}</ul>
    </li>
  ));

  return (
    <div className="navbar bg-base-100 px-10 w-full">
      <div className="navbar-start">
        <Link href="/" passHref>
          <Image
            src="https://www.shareicon.net/data/512x512/2015/09/18/642672_xxx_512x512.png"
            alt="Logo"
            className="h-10 cursor-pointer"
            width={40}
            height={40}
          />
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-100">
          <li>
            <a>Item 1</a>
          </li>
          <li className="dropdown dropdown-hover position-unset">
            <a tabIndex={0} className="cursor-pointer">
              Parent
            </a>
            <div className="absolute bg-transparent left-0 w-full rounded-none dropdown-content z-10 p-0 m-0 hover:bg-transparent active:bg-transparent focus:bg-transparent flex pt-3">
              <div className="p-0 m-0 bg-base-100 flex w-full flex pt-3">
                <ul className="menu xl:menu-horizontal lg:min-w-max m-0">
                  {listedPornstars}
                </ul>
              </div>
            </div>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <SearchBar />
      </div>
    </div>
  );
}
