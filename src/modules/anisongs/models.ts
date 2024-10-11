export enum ThemeType {
  ED = "ED",
  OP = "OP",
}

export type Video = {
  link: string;
  lyrics: boolean;
  nc: boolean;
  resolution?: number;
  source?: string;
  subbed: boolean;
  tags: string;
  uncen: boolean;
};

export function video_to_string(video: Video): string {
  let s = "";
  if (video.source) {
    s += `${video.source} `;
  }
  if (video.resolution) {
    s += `${video.resolution}p `;
  }
  if (video.nc) {
    s += " NC";
  }
  if (video.subbed) {
    s += " Subs";
  }
  if (video.lyrics) {
    s += " Lyrics";
  }
  if (video.uncen) {
    s += " Uncen";
  }

  return s;
}

export type Artist = {
  as?: string;
  name?: string;
};

export function artist_to_string(artist: Artist): string {
  return artist.as ? `${artist.name} as ${artist.as}` : (artist.name || "");
}

export type Song = {
  artists?: Artist[];
  as?: string;
  title?: string;
};

export type AnimeThemeEntry = {
  episodes?: string;
  notes?: string;
  nsfw: boolean;
  spoiler: boolean;
  version?: number;
  videos: Video[];
};

export type AnimeTheme = {
  animethemeentries: AnimeThemeEntry[];
  group?: string;
  sequence?: number;
  slug: string;
  song: Song;
  type?: ThemeType;
};

export function animethemeentry_to_string(entry: AnimeThemeEntry): string {
  let s = "";
  if (entry.version) {
    s += `v${entry.version} `;
  }
  if (entry.episodes) {
    s += `Eps. ${entry.episodes} `;
  }
  return s;
}

export type AnisongsData = {
  eds: AnimeTheme[];
  ops: AnimeTheme[];
  time: number;
};

export function themes_to_data(
  themes: AnimeTheme[],
): AnisongsData {
  return {
    ops: themes.filter((theme: AnimeTheme) => theme.type === ThemeType.OP),
    eds: themes.filter((theme: AnimeTheme) => theme.type === ThemeType.ED),
    time: Date.now(),
  };
}
