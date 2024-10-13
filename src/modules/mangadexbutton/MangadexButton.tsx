import LucideCat from "~icons/lucide/cat";
import { customElement, noShadowDOM } from "solid-element";
import { Component, createMemo, createResource } from "solid-js";

import { getExtraAttrs } from "../../utils";
import { getManga } from "./api";
import styleText from "./style.css";

type Props = {
  title: string | null;
  mediaId: string | null;
  dataAttrName: string | null;
};

const MangadexButton: Component<Props> = ({ title, mediaId, dataAttrName }) => {
  const extraAttrs = createMemo(() => getExtraAttrs(dataAttrName));

  const [data] = createResource(async () => {
    if (!title || !mediaId) {
      return null;
    }

    return getManga(title, mediaId);
  });

  const link = createMemo(() => {
    if (data()) {
      return `https://mangadex.org/title/${data()!.id}`;
    }

    return `https://mangadex.org/search?q=${title}`;
  });

  return (
    <a
      class="external-link licht-mangadex"
      href={link()}
      target="_blank"
      {...extraAttrs}
    >
      <div class="icon-wrap" {...extraAttrs}>
        <LucideCat class="icon default" {...extraAttrs} />
      </div>
      <span class="name" {...extraAttrs}>
        MangaDex
      </span>
    </a>
  );
};

export default MangadexButton;

export const defineMangadexButtonElement = () => {
  customElement<Props>("licht-mangadex-button", { title: null, mediaId: null, dataAttrName: null }, (props) => {
    noShadowDOM();

    return (
      <>
        <style>{styleText}</style>
        <MangadexButton {...props} />
      </>
    );
  });
};

export type MangadexButtonElement = HTMLElement & Props;
