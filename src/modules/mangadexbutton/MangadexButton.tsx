import LucideCat from "~icons/lucide/cat";
import { customElement, noShadowDOM } from "solid-element";
import { Component, createMemo, createResource } from "solid-js";

import { getManga } from "./api";
import styleText from "./style.css";

type Props = {
  title: string | null;
  mediaId: string | null;
  dataAttrName: string | null;
};

const MangadexButton: Component<Props> = ({ title, mediaId, dataAttrName }) => {
  const extraProps: Record<string, string> = {};

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

    return `https://mangadex.org/search?title=${title}`;
  });

  if (dataAttrName) {
    extraProps[dataAttrName] = "";
  }

  return (
    <a
      class="external-link licht-mangadex"
      href={link()}
      target="_blank"
      {...extraProps}
    >
      <div class="icon-wrap" {...extraProps}>
        <LucideCat class="icon default" {...extraProps} />
      </div>
      <span class="name" {...extraProps}>
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
