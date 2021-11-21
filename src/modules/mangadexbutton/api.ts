import { Manga, Result } from "./models";

const MangaDexButtonAPI = {
  async getManga(mediaTitle: string, mediaId: string): Promise<Manga | null> {
      const res = await fetch(
          `https://api.mangadex.org/manga?title=${mediaTitle}`
      );
      const data: Result = await res.json();

      if (!data.data || data.data.length == 0) {
          return null;
      }

      data.data.forEach(manga => {
          if (manga.attributes.links.al && manga.attributes.links.al === mediaId) {
              return manga;
          }
      });

      return null;
  }
};

export default MangaDexButtonAPI;
