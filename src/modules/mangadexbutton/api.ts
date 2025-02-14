import { type Manga, type Result } from "./models";

export const getManga = async (mediaTitle: string, mediaId: string): Promise<Manga | null> =>
  new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: `https://api.mangadex.org/manga?title=${mediaTitle}`,
      responseType: "json",
      onload: (resp) => {
        const body = resp.response as Result | null; // TODO verify

        if (!body || !body.data || body.data.length === 0) {
          return null;
        }

        for (const manga of body.data) {
          if (manga.attributes.links.al && manga.attributes.links.al === mediaId) {
            resolve(manga);
          }
        }

        resolve(null);
      },
      onerror: (err) => {
        reject(new Error(`Failed to fetch manga: ${err.statusText}`));
      },
    });
  });
