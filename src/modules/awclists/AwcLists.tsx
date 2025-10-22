import { customElement, noShadowDOM } from "solid-element";
import {
  type Component, createMemo, createResource, For, Match, Switch,
} from "solid-js";

import { getExtraAttrs } from "../../utils";
import { getLists } from "./api";

type Props = {
  mediaId: string | null;
  dataAttrName: string | null;
};

const AwcLists: Component<Props> = (props) => {
  const extraAttrs = createMemo(() => getExtraAttrs(props.dataAttrName));

  const [data] = createResource<string[] | null, string | null>(() => props.mediaId, async (mediaId) => {
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

  const sortedData = createMemo(() => {
    if (data()) {
      return data()!.toSorted();
    }

    return null;
  });

  return (
    <div class="data-set data-list" {...extraAttrs()}>
      <div class="type" {...extraAttrs()}>AWC Lists</div>
      <Switch>
        <Match when={data.loading}>
          <div class="value" {...extraAttrs()}>Loading...</div>
        </Match>
        <Match when={data.error as unknown}>
          <div class="value" {...extraAttrs()}>
            Error:
            {data.error}
          </div>
        </Match>
        <Match when={sortedData()}>
          <div class="value" {...extraAttrs()}>
            <Switch>
              <Match when={sortedData()!.length === 0}>
                <div>No lists</div>
              </Match>
              <Match when={sortedData()!.length > 0}>
                <For each={sortedData()}>
                  {(list) => (
                    <span>
                      {list}
                      <br />
                    </span>
                  )}
                </For>
              </Match>
            </Switch>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default AwcLists;

export const defineAwcListsElement = () => {
  customElement<Props>("licht-awc-lists", { mediaId: null, dataAttrName: null }, (props) => {
    noShadowDOM();

    return (
      <AwcLists {...props} />
    );
  });
};

export type AwcListsElement = HTMLElement & Props;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface HTMLElementTagNameMap {
    "licht-awc-lists": AwcListsElement;
  }
}
