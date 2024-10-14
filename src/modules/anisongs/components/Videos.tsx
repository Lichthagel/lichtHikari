import {
  type Component, createEffect, createMemo, createSignal, For, Show,
} from "solid-js";

import { type Video, video_to_string } from "../models";
import styles from "./style.module.css";

type Props = {
  videos: Video[];
};

const handleVolumeChange = (event: Event) => {
  const target = event.target as HTMLVideoElement;
  localStorage.setItem("lichtSongsVolume", target.volume.toString());
};

const [activeVideo, setActiveVideo] = createSignal<Video | undefined>();

const handleClick = (video: Video) => {
  if (activeVideo() === video) {
    setActiveVideo(undefined);
  } else {
    setActiveVideo(video);
  }
};

const Videos: Component<Props> = (props) => {
  const [videoElement, setVideoElement] = createSignal<HTMLVideoElement | undefined>();
  const active = createMemo<boolean>(
    () => !!activeVideo() && props.videos.includes(activeVideo()!),
  );

  createEffect(() => {
    if (active()) {
      void videoElement()?.play();
    }
  });

  createEffect(() => {
    if (!videoElement()) {
      return;
    }

    const volume = localStorage.getItem("lichtSongsVolume");

    if (volume) {
      videoElement()!.volume = Number.parseFloat(volume);
    }
  });

  return (
    <div>
      <For each={props.videos}>
        {(video) => (
          <div
            class={styles.button}
            classList={{ [styles.active]: activeVideo() === video }}
            on:click={() => handleClick(video)}
          >
            {video_to_string(video)}
          </div>
        )}
      </For>
      <Show when={active()}>
        <video
          controls
          on:ended={() => setActiveVideo(undefined)}
          on:volumechange={handleVolumeChange}
          preload="none"
          ref={setVideoElement}
          src={activeVideo()!.link}
        />
      </Show>
    </div>
  );
};

export default Videos;
