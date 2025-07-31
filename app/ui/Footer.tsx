import React from "react";
import localFont from "next/font/local";

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-inter",
});

export default function Footer() {
  return (
    <footer className="bg-[#080908] border-t-2 border-[#1f1e1d] text-white p-4">
      <aside className="container mx-auto px-4 text-center">
        <p className={`${inter.className} text-sm text-gray-400`}>
          Copyright © {new Date().getFullYear()} - All right reserved by XXX ?
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
}
