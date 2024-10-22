import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Image from "next/image";

type HeaderProps = {
  linkboxes: LinkBoxes;
};

export default function Header({ linkboxes }: HeaderProps) {
  const categories = Array.from({ length: 10 }, (_, i) => ({
    name: `Category ${i + 1}`,
    url: `/categories/${i + 1}`,
  }));

  const pornstars = Array.from({ length: 10 }, (_, i) => ({
    name: `Pornstar ${i + 1}`,
    url: `/pornstars/${i + 1}`,
  }));

  return (
    <div className="navbar bg-base-100 px-10">
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
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 w-screen">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex-none gap-2">
        <SearchBar />
      </div>
    </div>
  );
}
