import { customElement, noShadowDOM } from "solid-element";
import { Component, createMemo } from "solid-js";

import { getExtraAttrs } from "../../utils";

type Props = {
  username: string;
  dataAttrName: string | null;
};

const AwcButton: Component<Props> = (props) => {
  const extraAttrs = createMemo(() => getExtraAttrs(props.dataAttrName));

  return (
    <a class="nav-btn" href={`https://awc.moe/challenger/${props.username}`} target="_blank" {...extraAttrs()}>
      AWC Profile
    </a>
  );
};

export default AwcButton;

export const defineAwcButtonElement = () => {
  customElement<Props>("licht-awc-button", { username: "", dataAttrName: null }, (props) => {
    noShadowDOM();

    return (
      <AwcButton {...props} />
    );
  });
};

export type AwcButtonElement = HTMLElement & Props;
