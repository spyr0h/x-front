import React from "react";

type VideoCardHostContainerProps = {
  hostLinks: HostLink[];
};

type GroupedHostLinks = {
  [key: number]: HostLink[];
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

export default function VideoCard({ hostLinks }: VideoCardHostContainerProps) {
  const groupedLinks = groupHostLinks(hostLinks);

  const entries = Object.entries(groupedLinks);

  while (entries.length < 4) {
    entries.push(["", []]);
  }

  return (
    <div className="card-actions flex justify-between">
      {entries.map(([key], index) => (
        <button
          key={key || index}
          className={`btn overflow-hidden flex-[20%] grayscale hover:grayscale-0 transition-all duration-300 ${
            key !== "" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            backgroundImage: key ? 'url("/images/k2s.png")' : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "0",
          }}
        />
      ))}
    </div>
  );
}
