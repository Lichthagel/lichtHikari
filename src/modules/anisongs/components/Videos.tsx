import {
  type Component, createMemo, createSignal, For, onSettled, Show,
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
  setActiveVideo(activeVideo() === video ? undefined : video);
};

const Player: Component<{ video: Video }> = (props) => {
  let element: HTMLVideoElement | undefined;

  onSettled(() => {
    if (!element) {
      return;
    }

    const volume = localStorage.getItem("lichtSongsVolume");

    if (volume) {
      element.volume = Number(volume);
    }

    void element.play().catch(() => {});
  });

  return (
    <video
      controls
      onEnded={() => setActiveVideo(undefined)}
      onVolumeChange={handleVolumeChange}
      preload="none"
      ref={element}
      src={props.video.link}
    />
  );
};

const Videos: Component<Props> = (props) => {
  const selection = createMemo(() => {
    const video = activeVideo();
    return video && props.videos.includes(video) ? video : undefined;
  });

  return (
    <div>
      <For each={props.videos}>
        {(video) => (
          <div
            class={[styles.button, { [styles.active]: selection() === video }]}
            onClick={() => handleClick(video)}
          >
            {video_to_string(video)}
          </div>
        )}
      </For>
      <Show keyed when={selection()}>
        {(video) => <Player video={video} />}
      </Show>
    </div>
  );
};

export default Videos;
