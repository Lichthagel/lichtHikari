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
        query: this.query,
        variables: {
          id: mediaId,
        },
      }),
    });

    const json = await data.json();

    return Object.entries(json.data.MediaList.customLists).filter((
      [, b]: [string, boolean],
    ) => b).map(([a]: [string, boolean]) => a);
  },
};

export default AWCListsAPI;
