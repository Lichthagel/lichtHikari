import { customElement } from "solid-element";
import { Component } from "solid-js";

import styleText from "./style.css";

type Props = {
  username: string;
};

const AwcButton: Component<Props> = ({ username }) => (
  <a class="awc-button" href={`https://awc.moe/challenger/${username}`} target="_blank">
    AWC Profile
  </a>
);

export default AwcButton;

export const defineAwcButtonElement = () => {
  customElement<Props>("licht-awc-button", { username: "" }, ({ username: challenger }) => (
    <>
      <style>{styleText}</style>
      <AwcButton username={challenger} />
    </>
  ));
};

export type AwcButtonElement = HTMLElement & Props;
