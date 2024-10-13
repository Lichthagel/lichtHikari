import {
  type Component, createEffect, createSignal, For,
  Show,
} from "solid-js";

import { type Video, video_to_string } from "../models";

type Props = {
  videos: Video[];
};

const handleVolumeChange = (event: Event) => {
  const target = event.target as HTMLVideoElement;
  localStorage.setItem("lichtSongsVolume", target.volume.toString());
};

const Videos: Component<Props> = ({ videos }) => {
  const [activeVideo, setActiveVideo] = createSignal<Video | undefined>();
  const [videoElement, setVideoElement] = createSignal<HTMLVideoElement | undefined>();

  const handleClick = (video: Video) => {
    if (activeVideo() === video) {
      setActiveVideo(undefined);
    } else {
      setActiveVideo(video);
    }
  };

  createEffect(() => {
    if (activeVideo()) {
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
      <For each={videos}>
        {(video) => (
          <div
            class="button"
            classList={{ active: activeVideo() === video }}
            on:click={() => handleClick(video)}
          >
            {video_to_string(video)}
          </div>
        )}
      </For>
      <Show when={activeVideo()}>
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