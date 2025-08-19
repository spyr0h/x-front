type Tag = {
  id: number;
  value: string;
};

type Category = {
  id: number;
  value: string;
};

type Pornstar = {
  id: number;
  value: string;
};

type Pornstar = {
  id: number;
  value: string;
};

type HostLink = {
  url: string;
  size: number;
  host: number;
  resolution: number;
  format: number;
  part: number;
};

type Picture = {
  directUrl: string;
  hostUrl: string;
};

type Video = {
  id: number;
  title: string;
  description: string;
  duration: number;
  year: number;
  new: boolean;
  tags: Tag[];
  categories: Category[];
  pornstars: Pornstar[];
  links: HostLink[];
  pictures: Picture[];
  url: string;
};

type Suggestion = {
  value: string;
  type: number;
  searchUrl: string;
};

type Page = {
  number: number;
  url: string;
  selected: boolean;
};

type Paging = {
  pages: Page[];
  previousPage: Page | null;
  nextPage: Page | null;
};

type LinkBoxLink = {
  url: string;
  linkText: string;
  order: number;
  count: number;
  recentCount: number;
};

type LinkBox = {
  title: string;
  category: number;
  order: number;
  links: LinkBoxLink[];
};

type LinkBoxes = {
  linkboxes: LinkBox[];
};

type SearchResult = {
  globalCount: number;
  count: number;
  videos: Video[];
};

type SeoData = {
  title: string;
  headline: string;
  description: string;
  canonical: string;
  isIndexed: boolean;
  recentCount: number;
};

type GroupedHostLinks = {
  [key: number | string]: HostLink[];
};

type SuggestionBox = {
  title: string;
  order: number;
  category: number;
  suggestedVideos: Video[];
};
