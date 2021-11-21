export enum ThemeType {
  OP = "OP",
  ED = "ED",
}

export interface AnimeTheme {
  type?: ThemeType;
  sequence?: number;
  group?: string;
  slug: string;
  song: Song;
  animethemeentries: AnimeThemeEntry[];
}

export interface AnimeThemeEntry {
  version?: number;
  episodes?: string;
  nsfw: boolean;
  spoiler: boolean;
  notes?: string;
  videos: Video[];
}

export function animethemeentry_to_string(entry: AnimeThemeEntry): string {
  let s = "";
  if (entry.version) s += `v${entry.version} `;
  if (entry.episodes) s += `Eps. ${entry.episodes} `;
  return s;
}

export interface Artist {
  name?: string;
  as?: string;
}

export function artist_to_string(artist: Artist): string {
  return artist.as ? `${artist.name} as ${artist.as}` : (artist.name || "");
}

export interface Video {
  resolution?: number;
  nc: boolean;
  subbed: boolean;
  lyrics: boolean;
  uncen: boolean;
  source?: string;
  tags: string;
  link: string;
}

export function video_to_string(video: Video): string {
  let s = "";
  if (video.source) s += video.source + " ";
  if (video.resolution) s += video.resolution + "p ";
  if (video.nc) s += " NC";
  if (video.subbed) s += " Subs";
  if (video.lyrics) s += " Lyrics";
  if (video.uncen) s += " Uncen";

  return s;
}

export interface Song {
  title?: string;
  as?: string;
  artists?: Artist[];
}

export interface AnisongsData {
  ops: AnimeTheme[];
  eds: AnimeTheme[];
  time: number;
}

export function themes_to_data(
  themes: AnimeTheme[],
): AnisongsData {
  return {
    ops: themes.filter((theme: AnimeTheme) => theme.type == ThemeType.OP),
    eds: themes.filter((theme: AnimeTheme) => theme.type == ThemeType.ED),
    time: +new Date()
  };
}
