import { customElement, noShadowDOM } from "solid-element";
import {
  type Component, createResource, Match, Switch,
} from "solid-js";

import AnisongsAPI from "../api";
import { type AnisongsData, themes_to_data } from "../models";
import styles from "./style.module.css";
import Themes from "./Themes";

type Props = {
  mediaId: string | null;
};

const Anisongs: Component<Props> = ({ mediaId }) => {
  const [data] = createResource(mediaId, async (mediaId) => {
    const cache = sessionStorage.getItem(`lichtSong${mediaId}`);

    // check if request needed
    if (cache) {
      console.log("lichtAnisongs: data in cache");

      return JSON.parse(cache) as AnisongsData; // TODO validate
    } else {
      const themes = await AnisongsAPI.getThemes(mediaId);

      if (!themes) {
        console.log("lichtAnisongs: not found on AnimeThemes");
        return;
      }

      const data = themes_to_data(themes);

      sessionStorage.setItem(`lichtSong${mediaId}`, JSON.stringify(data));

      return data;
    }
  });

  return (
    <Switch>
      <Match when={data.loading}>
        <div>Loading...</div>
      </Match>
      <Match when={data.error as unknown}>
        <div>
          Error:
          {data.error}
        </div>
      </Match>
      <Match when={data()}>
        <div class={styles.anisongs}>
          <Themes heading="Openings" themes={data()!.ops} />
          <Themes heading="Endings" themes={data()!.eds} />
        </div>
      </Match>
    </Switch>
  );
};

export default Anisongs;

export type AnisongsElement = HTMLElement & Props;

export const defineAnisongsElement = () => {
  customElement<Props>("licht-anisongs", { mediaId: null }, (props) => {
    noShadowDOM();

    return <Anisongs {...props} />;
  });
};
