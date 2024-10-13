import { customElement } from "solid-element";
import { Component, createResource, Show } from "solid-js";

import AWCListsAPI from "./api";
import styleText from "./style.css";

type Props = {
  mediaId: string | null;
};

const AwcLists: Component<Props> = ({ mediaId }) => {
  const [data] = createResource(mediaId, async (mediaId) => {
    if (!mediaId) {
      return null;
    }

    // load cache
    const cache: string | null = sessionStorage.getItem(`lichtAWCLists${mediaId}`);

    // check if request needed
    if (cache) {
      console.log("lichtAWCLists: data in cache");

      return cache;
    } else {
      const lists = await AWCListsAPI.getListsString(Number.parseInt(mediaId));

      sessionStorage.setItem(`lichtAWCLists${mediaId}`, lists);

      return lists;
    }
  });

  return (
    <div class="licht-data-set">
      <div class="licht-type">AWC Lists</div>
      <Show when={data.loading}>
        <div class="licht-value">Loading...</div>
      </Show>
      <Show when={data.error as unknown}>
        <div class="licht-value">
          Error:
          {data.error}
        </div>
      </Show>
      <Show when={data()}>
        <div class="licht-value">
          {data()}
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
