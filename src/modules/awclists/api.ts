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

    if (!json.data || !json.data.MediaList) return [];

    return Object.entries(json.data.MediaList.customLists).filter((
      [, b]: [string, boolean],
    ) => b).map(([a]: [string, boolean]) => a);
  },
  async getListsString(mediaId: number): Promise<string> {
    const lists = await this.getLists(mediaId);
    if (!lists || lists.length == 0) {
      return "None";
    } else {
      return lists.join(", \n");
    }
  }
};

export default AWCListsAPI;
