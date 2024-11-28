import React from "react";

import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";

type SerpLayoutProps = {
  linkboxes: LinkBoxes;
};

export default function NotFoundLayout({ linkboxes }: SerpLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header linkboxes={linkboxes} />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div style={{ textAlign: "center", marginTop: "20vh" }}>
            <h1 style={{ fontSize: "3rem" }}>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
