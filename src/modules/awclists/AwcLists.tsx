import { customElement, noShadowDOM } from "@solidjs/element";
import {
  type Component,
  createMemo,
  Errored,
  For,
  Loading,
  Show,
} from "solid-js";

import { getExtraAttrs } from "../../utils";
import { getLists } from "./api";

type Props = {
  mediaId: string | null;
  dataAttrName: string | null;
};

const AwcLists: Component<Props> = (props) => {
  const extraAttrs = createMemo(() => getExtraAttrs(props.dataAttrName));

  const data = createMemo(async () => {
    const mediaId = props.mediaId;
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
    }

    const lists = await getLists(Number.parseInt(mediaId));

    sessionStorage.setItem(`lichtAWCLists${mediaId}`, lists.join(","));

    return lists;
  });

  const sortedData = createMemo(() => data()?.toSorted((a, b) => a.localeCompare(b)));

  return (
    <div class="data-set data-list" {...extraAttrs()}>
      <div class="type" {...extraAttrs()}>AWC Lists</div>
      <Errored fallback={(error) => <div class="value" {...extraAttrs()}>{`Error: ${String(error())}`}</div>}>
        <Loading fallback={<div class="value" {...extraAttrs()}>Loading...</div>}>
          <Show when={sortedData()}>
            {(lists) => (
              <div class="value" {...extraAttrs()}>
                <For each={lists()} fallback={<div>No lists</div>}>
                  {(list) => (
                    <span>
                      {list}
                      <br />
                    </span>
                  )}
                </For>
              </div>
            )}
          </Show>
        </Loading>
      </Errored>
    </div>
  );
};

export default AwcLists;

export const defineAwcListsElement = () => {
  customElement<Props>("licht-awc-lists", { mediaId: null, dataAttrName: null }, (props) => {
    noShadowDOM();
    return <AwcLists {...props} />;
  });
};

export type AwcListsElement = HTMLElement & Props;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface HTMLElementTagNameMap {
    "licht-awc-lists": AwcListsElement;
  }
}
