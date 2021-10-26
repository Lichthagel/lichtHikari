import { AnimeTheme, AnimeThemeEntry, Artist, Song, Video } from "./models";

const AnisongsAPI = {
  async getThemes(mediaId: string): Promise<AnimeTheme[]> {
    const res = await fetch(
      `https://staging.animethemes.moe/api/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${mediaId}&include=animethemes.animethemeentries.videos,animethemes.song.artists`,
    );
    const data: any = await res.json();

    if (!data.anime || data.anime.length === 0) {
        return [];
    }
    return data.anime[0].animethemes;
  },

  parseArtist(artistInfo: Artist) {
    if (artistInfo.as) {
      return `${artistInfo.as} (${artistInfo.name})`;
    } else {
      return artistInfo.name;
    }
  },

  parseArtists(artistsInfo: Artist[]) {
    if (!artistsInfo || artistsInfo.length == 0) return "";

    return artistsInfo.map((artistInfo: any) => this.parseArtist(artistInfo))
      .join(", ");
  },

  parseSong(songInfo: Song) {
    return `${songInfo.title} by ${this.parseArtists(songInfo.artists)}`;
  },

  parseVideo(videoInfo: Video, prefix: string) {
    return {
      tags: prefix + videoInfo.tags,
      link: videoInfo.link.replace("staging.", ""),
    };
  },

  parseVideos(videosInfo: Video[], prefix: string) {
    return videosInfo.map((videoInfo: any) =>
      this.parseVideo(videoInfo, prefix)
    );
  },

  parseThemeEntries(entriesInfo: AnimeThemeEntry[]) {
    if (entriesInfo.length == 0) return [];
    if (entriesInfo.length == 1) {
      return this.parseVideos(entriesInfo[0].videos, "");
    }
    return entriesInfo.map((entryInfo: any) =>
      this.parseVideos(entryInfo.videos, `v${entryInfo.version}_`)
    ).reduce((l: any[], r: any[]) => l.concat(r), []);
  },

  parseResponse(data: any) {
    if (data.anime.length == 0) {
      return null;
    }

    data = data.anime[0].animethemes;

    return data.map((theme: AnimeTheme) => {
      return {
        slug: theme.slug,
        song: this.parseSong(theme.song),
        videos: this.parseThemeEntries(theme.animethemeentries),
      };
    });
  },
};

export default AnisongsAPI;
