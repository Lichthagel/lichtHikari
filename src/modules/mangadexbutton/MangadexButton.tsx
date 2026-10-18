import { customElement, noShadowDOM } from "solid-element";
import { type Component, createMemo, createResource } from "solid-js";

import LucideCat from "~icons/lucide/cat";

import { getExtraAttrs } from "../../utils";
import { getManga } from "./api";
import styles from "./style.module.css";

type Props = {
  title: string | null;
  mediaId: string | null;
  dataAttrName: string | null;
};

const MangadexButton: Component<Props> = (props) => {
  const extraAttrs = createMemo(() => getExtraAttrs(props.dataAttrName));

  const [data] = createResource(async () => props.title && props.mediaId ? getManga(props.title, props.mediaId) : null);

  const link = createMemo(() => data() ? `https://mangadex.org/title/${data()!.id}` : `https://mangadex.org/search?q=${props.title}`);

  return (
    <a
      class={`external-link ${styles.mangadex}`}
      href={link()}
      target="_blank"
      {...extraAttrs()}
    >
      <div class="icon-wrap" {...extraAttrs()}>
        <LucideCat class="icon default" {...extraAttrs()} />
      </div>
      <span class="name" {...extraAttrs()}>
        MangaDex
      </span>
    </a>
  );
};

export default MangadexButton;

export const defineMangadexButtonElement = () => {
  customElement<Props>("licht-mangadex-button", { title: null, mediaId: null, dataAttrName: null }, (props) => {
    noShadowDOM();

    return <MangadexButton {...props} />;
  });
};

export type MangadexButtonElement = HTMLElement & Props;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface HTMLElementTagNameMap {
    "licht-mangadex-button": MangadexButtonElement;
  }
}
