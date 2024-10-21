import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="logo">
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

      <SearchBar />
    </header>
  );
}
