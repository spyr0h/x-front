import { Host } from "../types/enum";

export const groupHostLinks = (hostLinks: HostLink[]): GroupedHostLinks => {
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

  return groupedLinks;
};
