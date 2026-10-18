const QUERY = `
    query ($id: Int) {
        MediaList(userName:"AWC", mediaId: $id) {
          customLists(asArray: false)
        }
      }
    `;

export const getLists = async (mediaId: number): Promise<string[]> => {
  const data = await fetch("https://graphql.anilist.co/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        id: mediaId,
      },
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await data.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return json.data && json.data.MediaList
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ? Object.entries(json.data.MediaList.customLists as { [key: string]: boolean })
        .filter(([, b]: [string, boolean]) => b)
        .map(([a]: [string, boolean]) => a)
    : [];
};
