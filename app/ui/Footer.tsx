import React from "react";
import localFont from "next/font/local";

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-inter",
});

const newake = localFont({
  src: "../fonts/newake.otf",
  variable: "--font-newake",
});

export default function Footer() {
  return (
    <footer className="bg-[#080908] border-t-2 border-[#1f1e1d] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div
            className={`${newake.className} text-3xl text-white flex items-center`}
          >
            <span>KIN</span>
            <span>
              <span className="inline-block transform scale-x-[-1]">K</span>K
            </span>
            <span className="-ml-1">ORNER</span>
          </div>

          {/* Links - Temporairement commentés */}
          {/* <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a
              href="#"
              className={`${inter.className} text-gray-400 hover:text-white transition-colors duration-200`}
            >
              About
            </a>
            <a
              href="#"
              className={`${inter.className} text-gray-400 hover:text-white transition-colors duration-200`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`${inter.className} text-gray-400 hover:text-white transition-colors duration-200`}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className={`${inter.className} text-gray-400 hover:text-white transition-colors duration-200`}
            >
              Contact
            </a>
          </div> */}

          {/* Copyright */}
          <div className="border-t border-[#1f1e1d] pt-8 w-full text-center">
            <p className={`${inter.className} text-sm text-gray-400`}>
              © {new Date().getFullYear()} KinkKorner. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
