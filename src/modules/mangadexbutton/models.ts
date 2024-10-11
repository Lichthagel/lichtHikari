export type LocalizedString = {
  en: string;
  [key: string]: string;
};

export type Links = {
  al?: string;
  ap?: string;
  bw?: string;
  kt?: string;
  mu?: string;
  amz?: string;
  ebj?: string;
  mal?: string;
  engtl?: string;
};

export type Attributes = {
  title: LocalizedString;
  altTitles: LocalizedString[];
  description: LocalizedString;
  links: Links;
  originalLanguage: string; // TODO enum
  lastVolume?: string;
  lastChapter?: string;
  publicationDemographic?: string; // TODO enum
  status: string; // TODO enum
  year?: string;
  contentRating: string; // TODO enum
  tags: unknown[]; // TODO type
  state: string; // TODO enum
  createdAt: string;
  updatedAt: string;
  version: number;
};

export type Relation = {
  id: string;
  type: string; // TODO enum
  related?: string;
};

export type Manga = {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relation[];
};

export type Result = {
  result: string;
  response: string;
  data: Manga[];
};
