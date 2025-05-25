import React from "react";

import Paging from "@/app/ui/Paging";
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import VideoCard from "@/app/ui/VideoCard";

type SerpLayoutProps = {
  searchResult: SearchResult;
  seoData: SeoData;
  searchPaging: Paging;
  linkboxes: LinkBoxes;
};

export default function SerpLayout({
  searchResult,
  seoData,
  searchPaging,
  linkboxes,
}: SerpLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header linkboxes={linkboxes} />
      <div className="flex-grow bg-[#050504]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-left relative flex items-center">
            {seoData.headline}
            {seoData.recentCount !== 0 && (
              <div className="badge badge-error badge-lg ml-2 relative -top-3">
                +{seoData.recentCount} new video
                {seoData.recentCount === 1 ? "" : "s"}
              </div>
            )}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResult.videos.map((video: Video) => (
              <VideoCard key={video.id} video={video} host={true} />
            ))}
          </div>
        </div>
        <Paging paging={searchPaging} />
      </div>
      <Footer />
    </div>
  );
}
