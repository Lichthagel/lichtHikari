declare module "~icons/*" {
  import type { JSX } from "@solidjs/web";
  import type { Component } from "solid-js";

  const icon: Component<JSX.IntrinsicElements["svg"]>;
  export default icon;
}
