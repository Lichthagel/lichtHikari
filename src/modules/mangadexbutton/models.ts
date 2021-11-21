export interface Result {
    result: string;
    response: string;
    data: Manga[];
}

export interface Manga {
    id: string;
    type: string;
    attributes: Attributes;
    relationships: Relation[];

}

export interface Attributes {
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
    tags: any[]; // TODO type
    state: string; // TODO enum
    createdAt: string;
    updatedAt: string;
    version: number;
}

export interface LocalizedString {
    en: string;
    [key: string]: string;
}

export interface Links {
    al?: string;
    ap?: string;
    bw?: string;
    kt?: string;
    mu?: string;
    amz?: string;
    ebj?: string;
    mal?: string;
    engtl?: string;
}

export interface Relation {
    id: string;
    type: string; // TODO enum
    related?: string;
}