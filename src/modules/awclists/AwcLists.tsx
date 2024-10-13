import { customElement } from "solid-element";
import {
  Component, createResource, For, Show,
} from "solid-js";

import { getLists } from "./api";
import styleText from "./style.css";

type Props = {
  mediaId: string | null;
};

const AwcLists: Component<Props> = ({ mediaId }) => {
  const [data] = createResource<string[] | null, string | null>(mediaId, async (mediaId) => {
    if (!mediaId) {
      return null;
    }

    // load cache
    const cache: string | null = sessionStorage.getItem(`lichtAWCLists${mediaId}`);

    // check if request needed
    if (cache && cache.length > 0) {
      console.log("lichtAWCLists: data in cache");

      const lists = cache.split(",");

      return lists;
    } else {
      const lists = await getLists(Number.parseInt(mediaId));

      sessionStorage.setItem(`lichtAWCLists${mediaId}`, lists.join(","));

      return lists;
    }
  });

  return (
    <div class="data-set data-list">
      <div class="type">AWC Lists</div>
      <Show when={data.loading}>
        <div class="value">Loading...</div>
      </Show>
      <Show when={data.error as unknown}>
        <div class="value">
          Error:
          {data.error}
        </div>
      </Show>
      <Show when={data()}>
        <div class="value">
          <For each={data()}>
            {(list) => (
              <span>
                {list}
                <br />
              </span>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default AwcLists;

export const defineAwcListsElement = () => {
  customElement<Props>("licht-awc-lists", { mediaId: null }, ({ mediaId }) => (
    <>
      <style>{styleText}</style>
      <AwcLists mediaId={mediaId} />
    </>
  ));
};

export type AwcListsElement = HTMLElement & Props;
