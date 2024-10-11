const AWCListsAPI = {
  query: `
    query ($id: Int) {
        MediaList(userName:"AWC", mediaId: $id) {
          customLists(asArray: false)
        }
      }
    `,
  async getLists(mediaId: number): Promise<string[]> {
    const data = await fetch("https://graphql.anilist.co/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: AWCListsAPI.query,
        variables: {
          id: mediaId,
        },
      }),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await data.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!json.data || !json.data.MediaList) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return Object.entries(json.data.MediaList.customLists).filter((
      [, b]: [string, boolean],
    ) => b)
      .map(([a]: [string, boolean]) => a);
  },
  async getListsString(mediaId: number): Promise<string> {
    const lists = await AWCListsAPI.getLists(mediaId);
    return !lists || lists.length === 0 ? "None" : lists.join(", \n");
  },
};

export default AWCListsAPI;
