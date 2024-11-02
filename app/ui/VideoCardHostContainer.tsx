import React from "react";
import VideoCardHostButton from "./VideoCardHostButton";
import { groupHostLinks } from "../utils/helpers";

type VideoCardHostContainerProps = {
  hostLinks: HostLink[];
};

export default function VideoCardHostContainer({
  hostLinks,
}: VideoCardHostContainerProps) {
  const groupedLinks = groupHostLinks(hostLinks);

  const limitedGroupedLinks = Object.fromEntries(
    Object.entries(groupedLinks).slice(0, 4)
  );

  const entries = Object.entries(limitedGroupedLinks);

  while (entries.length < 4) {
    entries.push(["", []]);
  }

  return (
    <div className="card-actions flex justify-between">
      {entries.map(([key, hostLinks]) => (
        <div key={key} className="flex-[20%] z-20">
          <VideoCardHostButton hostKey={key} hostLinks={hostLinks} />
        </div>
      ))}
    </div>
  );
}
