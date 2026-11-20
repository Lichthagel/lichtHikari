import { customElement, noShadowDOM } from "@solidjs/element";
import { type Component, createMemo } from "solid-js";

import LucideCat from "~icons/lucide/cat";

import { getExtraAttrs } from "../../utils";
import { getManga } from "./api";
import styles from "./style.module.css";

type Props = {
  mediaTitle: string | null;
  mediaId: string | null;
  dataAttrName: string | null;
};

const MangadexButton: Component<Props> = (props) => {
  const extraAttrs = createMemo(() => getExtraAttrs(props.dataAttrName));

  const data = createMemo(async () => {
    const { mediaTitle, mediaId } = props;
    if (!mediaTitle || !mediaId) {
      return null;
    }

    try {
      return await getManga(mediaTitle, mediaId);
    } catch {
      return null;
    }
  }, { loadingValue: null });

  const link = createMemo(() => {
    const manga = data();
    return manga ? `https://mangadex.org/title/${manga.id}` : `https://mangadex.org/search?q=${props.mediaTitle}`;
  });

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
  customElement<Props>("licht-mangadex-button", { mediaTitle: null, mediaId: null, dataAttrName: null }, (props) => {
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
