const resolutionMap = ["SD", "HD", "FHD", "QHD", "2K", "4K", "8K"];
const formatMap = ["mp4", "rar", "avi"];

export const getResolutionText = (resolution: number | undefined): string => {
  return resolution !== undefined &&
    resolution >= 0 &&
    resolution < resolutionMap.length
    ? resolutionMap[resolution]
    : "";
};

export const getFormatText = (format: number | undefined): string => {
  return format !== undefined && format >= 0 && format < formatMap.length
    ? formatMap[format]
    : "";
};

export const formatSize = (size: number): string => {
  return size >= 1000 ? `${(size / 1000).toFixed(2)} GB` : `${size} MB`;
};
