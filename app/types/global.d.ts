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
  tags: Tag[];
  categories: Category[];
  pornstars: Pornstar[];
  hostlinks: HostLink[];
  pictures: Picture[];
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
};

type LinkBox = {
  title: string;
  category: number;
  order: number;
  links: LinkBoxLink[];
};

type LinkBoxes = {
  linkBoxes: LinkBox[];
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
};
