import type {
  AnimeTheme, AnimeThemeEntry, Artist, Video,
} from "./models";

const endpoint = "https://rs.animethemes.moe/graphql";

const themesQuery = `
  query Anisongs($id: [Int!]) {
    filterAnimeByExternalSite(site: ANILIST, id: $id) {
      themes {
        slug
        type
        sequence
        group { name }
        song {
          title { romaji native }
          staff { as role artist { name { main } } }
        }
        entries {
          episodes
          notes
          nsfw
          spoiler
          version
          videos {
            nodes { link lyrics nc resolution source: sourceLocalized subbed tags uncen }
          }
        }
      }
    }
  }
`;

type GraphQLEntry = Omit<AnimeThemeEntry, "episodes" | "notes" | "videos"> & {
  episodes: string | null;
  notes: string | null;
  videos: { nodes: GraphQLVideo[] };
};

type GraphQLTheme = Pick<AnimeTheme, "slug"> & {
  entries: GraphQLEntry[];
  group: { name: string } | null;
  sequence: number | null;
  song: {
    staff: SongCredit[];
    title: { native: string | null; romaji: string | null };
  } | null;
  type: NonNullable<AnimeTheme["type"]>;
};

type GraphQLVideo = Omit<Video, "resolution" | "source"> & {
  resolution: number | null;
  source: string | null;
};

type SongCredit = {
  as: string | null;
  artist: { name: { main: string } };
  role: string;
};

function mapArtists(credits: SongCredit[]): Artist[] {
  const artists: Artist[] = [];
  const seen = new Set<string>();
  for (const credit of credits) {
    if (credit.role !== "Performance") {
      continue;
    }
    const name = credit.artist.name.main;
    const key = JSON.stringify([name, credit.as]);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    artists.push({ as: credit.as ?? undefined, name });
  }
  return artists;
}

function mapTheme(theme: GraphQLTheme): AnimeTheme {
  return {
    animethemeentries: theme.entries.map((entry) => ({
      ...entry,
      episodes: entry.episodes ?? undefined,
      notes: entry.notes ?? undefined,
      videos: entry.videos.nodes.map((video) => ({
        ...video,
        resolution: video.resolution ?? undefined,
        source: video.source ?? undefined,
      })),
    })),
    group: theme.group?.name,
    sequence: theme.sequence ?? undefined,
    slug: theme.slug,
    song: {
      artists: mapArtists(theme.song?.staff ?? []),
      title: theme.song?.title.romaji ?? theme.song?.title.native ?? undefined,
    },
    type: theme.type,
  };
}

const AnisongsAPI = {
  async getThemes(mediaId: string): Promise<AnimeTheme[]> {
    const id = Number(mediaId);
    if (!Number.isSafeInteger(id) || id <= 0 || id > 2_147_483_647) {
      throw new Error("Invalid AniList media ID");
    }

    const res = await fetch(endpoint, {
      body: JSON.stringify({ query: themesQuery, variables: { id: [id] } }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    if (!res.ok) {
      throw new Error(`AnimeThemes request failed (HTTP ${res.status})`);
    }

    const response = await res.json() as {
      data?: { filterAnimeByExternalSite: { themes: GraphQLTheme[] }[] } | null;
      errors?: { message: string }[];
    } | null;
    if (response?.errors?.length) {
      throw new Error(`AnimeThemes: ${response.errors.map((error) => error.message).join("; ")}`);
    }

    const anime = response?.data?.filterAnimeByExternalSite;
    if (!Array.isArray(anime)) {
      throw new TypeError("Invalid AnimeThemes response");
    }
    return anime.flatMap(({ themes }) => themes.map((theme) => mapTheme(theme)));
  },
};

export default AnisongsAPI;
