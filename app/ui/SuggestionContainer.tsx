import React from "react";
import VideoCarousel from "./VideoCarousel";

type SuggestionContainerProps = {
  suggestionBoxes: SuggestionBox[];
  disableHover?: boolean;
};

export default function SuggestionContainer({
  suggestionBoxes,
  disableHover = false,
}: SuggestionContainerProps) {
  suggestionBoxes.sort((a, b) => a.order - b.order);
  const videos = suggestionBoxes.flatMap(
    (suggestionBox) => suggestionBox.suggestedVideos
  );

  return (
    <div>
      {
        <div>
          <VideoCarousel videos={videos} disableHover={disableHover} />
        </div>
      }
    </div>
  );
}
