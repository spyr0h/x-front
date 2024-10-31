import React from "react";
import VideoCardHostButton from "./VideoCardHostButton";

type VideoCardHostContainerProps = {
  hostLinks: HostLink[];
};

type GroupedHostLinks = {
  [key: number | string]: HostLink[];
};

enum Host {
  DEPOSITFILECOM,
  DEPOSITFILEORG,
  DEPOSITFILESHORT,
  RAPIDGATOR,
  RAPIDGATORSHORT,
  K2S,
  K2SSHORT,
  K2SSHORTER,
  FILEBOOM,
  FILEBOOMSHORT,
  FILEFACTORY,
  FILEJOKER,
  FILEFOX,
  TEZFILES,
  FILESPACE,
  ONEFICHIER,
  MOVED,
}

const groupHostLinks = (hostLinks: HostLink[]): GroupedHostLinks => {
  const groupedLinks: GroupedHostLinks = {};

  const predefinedGroups: { [key: number]: Host[] } = {
    [Host.DEPOSITFILECOM]: [
      Host.DEPOSITFILECOM,
      Host.DEPOSITFILEORG,
      Host.DEPOSITFILESHORT,
    ],
    [Host.RAPIDGATOR]: [Host.RAPIDGATOR, Host.RAPIDGATORSHORT],
    [Host.K2S]: [Host.K2S, Host.K2SSHORT, Host.K2SSHORTER],
    [Host.FILEBOOM]: [Host.FILEBOOM, Host.FILEBOOMSHORT],
  };

  hostLinks.forEach((link) => {
    let foundGroup = false;
    for (const groupKey in predefinedGroups) {
      const groupKeyNumber = Number(groupKey);

      if (predefinedGroups[groupKeyNumber].includes(link.host)) {
        if (!groupedLinks[groupKeyNumber]) {
          groupedLinks[groupKeyNumber] = [];
        }
        groupedLinks[groupKeyNumber].push(link);
        foundGroup = true;
        break;
      }
    }

    if (!foundGroup) {
      if (!groupedLinks[link.host]) {
        groupedLinks[link.host] = [];
      }
      groupedLinks[link.host].push(link);
    }
  });

  const limitedGroupedLinks = Object.fromEntries(
    Object.entries(groupedLinks).slice(0, 4)
  );

  return limitedGroupedLinks;
};

export default function VideoCardHostContainer({
  hostLinks,
}: VideoCardHostContainerProps) {
  const groupedLinks = groupHostLinks(hostLinks);

  const entries = Object.entries(groupedLinks);

  while (entries.length < 4) {
    entries.push(["", []]);
  }

  return (
    <div className="card-actions flex justify-between">
      {entries.map(([key, hostLinks]) => (
        <VideoCardHostButton key={key} hostKey={key} hostLinks={hostLinks} />
      ))}
    </div>
  );
}
