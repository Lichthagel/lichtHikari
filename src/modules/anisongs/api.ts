import {
  type AnimeTheme, type AnimeThemeEntry, type Artist, type Song, type Video,
} from "./models";

// TODO validate the response
const AnisongsAPI = {
  async getThemes(mediaId: string): Promise<AnimeTheme[]> {
    const res = await fetch(
      `https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${mediaId}&include=animethemes.animethemeentries.videos,animethemes.song.artists`,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!data.anime || data.anime.length === 0) {
      return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return data.anime[0].animethemes as AnimeTheme[];
  },

  parseArtist(artistInfo: Artist) {
    return artistInfo.as ? `${artistInfo.as} (${artistInfo.name})` : artistInfo.name;
  },

  parseArtists(artistsInfo: Artist[]) {
    if (!artistsInfo || artistsInfo.length === 0) {
      return "";
    }

    return artistsInfo.map((artistInfo) => AnisongsAPI.parseArtist(artistInfo))
      .join(", ");
  },

  parseSong(songInfo: Song) {
    return `${songInfo.title} by ${songInfo.artists ? AnisongsAPI.parseArtists(songInfo.artists) : "uknown artist"}`;
  },

  parseVideo(videoInfo: Video, prefix: string) {
    return {
      tags: prefix + videoInfo.tags,
      link: videoInfo.link.replace("staging.", ""),
    };
  },

  parseVideos(videosInfo: Video[], prefix: string) {
    return videosInfo.map((videoInfo) =>
      AnisongsAPI.parseVideo(videoInfo, prefix));
  },

  parseThemeEntries(entriesInfo: AnimeThemeEntry[]) {
    if (entriesInfo.length === 0) {
      return [];
    }
    if (entriesInfo.length === 1) {
      return AnisongsAPI.parseVideos(entriesInfo[0].videos, "");
    }
    return entriesInfo.flatMap((entryInfo) =>
      AnisongsAPI.parseVideos(entryInfo.videos, `v${entryInfo.version}_`));
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseResponse(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (data.anime.length === 0) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const themes = data.anime[0].animethemes as AnimeTheme[];

    return themes.map((theme) => ({
      slug: theme.slug,
      song: AnisongsAPI.parseSong(theme.song),
      videos: AnisongsAPI.parseThemeEntries(theme.animethemeentries),
    }));
  },
};

export default AnisongsAPI;
