import { Manga, Result } from "./models";

const MangaDexButtonAPI = {
  async getManga(mediaTitle: string, mediaId: string): Promise<Manga | null> {
    const res = await fetch(
      `https://api.mangadex.org/manga?title=${mediaTitle}`,
    );
    const data = await res.json() as Result; // TODO validate

    if (!data.data || data.data.length === 0) {
      return null;
    }

    for (const manga of data.data) {
      if (manga.attributes.links.al && manga.attributes.links.al === mediaId) {
        return manga;
      }
    }

    return null;
  },
};

export default MangaDexButtonAPI;
