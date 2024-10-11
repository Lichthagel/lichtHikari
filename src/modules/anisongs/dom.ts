import {
  AnimeTheme,
  AnimeThemeEntry,
  AnisongsData,
  artist_to_string,
  Video,
  video_to_string,
} from "./models";

function highlight_active(parent: Element, activeEl?: Element) {
  for (const child of parent.childNodes) {
    if (child instanceof Element) {
      if (child === activeEl) {
        child.classList.add("active");
      } else if (child.tagName === "video") {
        /* empty */
      } else {
        child.classList.remove("active");
      }
    }
  }
}

const AnisongsDOM = {
  insertVideos(target: Element, videos: Video[]) {
    const videoEl = document.createElement("video");

    videoEl.src = videos[0].link.replace("staging.", "");
    videoEl.controls = true;
    videoEl.preload = "none";
    videoEl.volume = Number.parseFloat(
      localStorage.getItem("lichtSongsVolume") || "0.4",
    );
    videoEl.addEventListener("ended", () => {
      highlight_active(target);
      videoEl.remove();
    });
    videoEl.addEventListener("volumechange", () => {
      localStorage.setItem("lichtSongsVolume", videoEl.volume.toString());
    });

    for (const video of videos) {
      const videoButton = document.createElement("div");
      videoButton.textContent = video_to_string(video);
      videoButton.classList.add("lichtButton");
      videoButton.addEventListener("click", () => {
        if (videoEl.parentElement) { // video element already placed
          if (videoEl.src === video.link.replace("staging.", "")) { // video element currently playing correct video
            videoEl.remove();
            videoButton.classList.remove("active");
          } else {
            videoEl.src = video.link.replace("staging.", ""); // video element currently playing another video
            void videoEl.play();
            highlight_active(target, videoButton);
          }
        } else { // video element not yet placed
          videoEl.src = video.link.replace("staging.", "");
          videoEl.autoplay = true;
          target.append(videoEl);
          highlight_active(target, videoButton);
        }
      });

      target.append(videoButton);
    }
  },

  insertThemeEntry(target: Element, theme: AnimeThemeEntry) {
    const el = document.createElement("div");
    el.classList.add("lichtThemeEntry");

    // VERSION
    if (theme.version) {
      const version = document.createElement("div");
      version.textContent = `v${theme.version}`;
      version.classList.add("lichtTag");
      el.append(version);
    }

    // EPISODES
    if (theme.episodes) {
      const episodes = document.createElement("div");
      episodes.textContent = `Episode(s): ${theme.episodes}`;
      episodes.classList.add("lichtTag");
      el.append(episodes);
    }

    // NSFW
    if (theme.nsfw) {
      const nsfw = document.createElement("div");
      nsfw.textContent = "NSFW";
      nsfw.classList.add("lichtTag");
      el.append(nsfw);
    }

    // SPOILER
    if (theme.spoiler) {
      const spoiler = document.createElement("div");
      spoiler.textContent = "Spoiler";
      spoiler.classList.add("lichtTag");
      el.append(spoiler);
    }

    // VIDEOS
    const videos = document.createElement("div");

    AnisongsDOM.insertVideos(videos, theme.videos);
    // const videosElement = new VideosElement(videos, theme.videos);

    // theme.videos.forEach((video) => this.insertVideo(videos, video));

    el.append(videos);

    target.append(el);
  },

  insertTheme(target: Element, theme: AnimeTheme) {
    const el = document.createElement("div");
    el.classList.add("lichtTheme");

    // HEADING
    const heading = document.createElement("div");
    heading.classList.add("lichtThemeHeading");

    // SLUG
    const slug = document.createElement("span");
    slug.classList.add("lichtThemeSlug");
    slug.textContent = theme.slug;

    // SONG
    const song = document.createElement("span");
    song.textContent = theme.song.title || "";

    heading.append(slug);
    heading.append(song);

    el.append(heading);
    // HEADING END

    // GROUP
    if (theme.group) {
      const group = document.createElement("div");

      group.innerHTML = `<b>${theme.group}</b>`;

      el.append(group);
    }

    // ARTIST(S)
    if (theme.song.artists && theme.song.artists.length > 0) {
      const artist = document.createElement("div");

      artist.innerHTML = `<b>Artist(s):</b> ${
        theme.song.artists.map((element) => artist_to_string(element)).join(", ")}`;

      el.append(artist);
    }

    for (const entry of theme.animethemeentries) {
      AnisongsDOM.insertThemeEntry(el, entry);
    }

    target.append(el);
  },

  insertThemes(
    target: Element,
    themes: AnimeTheme[],
    heading: string,
    pos: number,
  ) {
    const container = document.createElement("div");
    container.append(document.createElement("h2"));
    (container.children[0] as HTMLElement).textContent = heading;
    container.classList.add("lichtContainer");

    if (!themes || themes.length === 0) {
      const el = document.createElement("div");
      el.textContent = "Nothing found";
      container.append(el);
    }

    for (const theme of themes) {
      AnisongsDOM.insertTheme(container, theme);
    }

    target.insertBefore(container, target.children[pos]);
  },

  addTo(target: Element, data: AnisongsData) {
    AnisongsDOM.insertThemes(target, data.ops, "Openings", 0);
    AnisongsDOM.insertThemes(target, data.eds, "Endings", 1);
  },

  clean(target: Element) {
    for (const e of target.querySelectorAll(".lichtContainer")) {
      e.remove();
    }
  },
};

export default AnisongsDOM;
