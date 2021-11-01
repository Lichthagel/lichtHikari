import {
  AnimeTheme,
  AnimeThemeEntry,
  AnisongsData,
  artist_to_string,
  Video,
  video_to_string,
} from "./models";

function highlight_active(parent: Element, activeEl?: Element) {
  parent.childNodes.forEach((child) => {
    if (child instanceof Element) {
      if (child == activeEl) {
        child.classList.add("active");
      } else if (child.tagName === "video") {
      } else {
        child.classList.remove("active");
      }
    }
  });
}

const AnisongsDOM = {
  async insertVideos(target: Element, videos: Video[]) {
    const videoEl = document.createElement("video");

    videoEl.src = videos[0].link.replace("staging.", "");
    videoEl.controls = true;
    videoEl.preload = "none";
    videoEl.volume = parseFloat(
      localStorage.getItem("lichtSongsVolume") || "0.4",
    );
    videoEl.addEventListener("ended", () => {
      highlight_active(target);
      videoEl.remove();
    });
    videoEl.addEventListener("volumechange", () => {
      localStorage.setItem("lichtSongsVolume", videoEl.volume.toString());
    });

    videos.forEach((video) => {
      const videoButton = document.createElement("div");
      videoButton.innerText = video_to_string(video);
      videoButton.classList.add("lichtButton");
      videoButton.addEventListener("click", (event) => {
        if (videoEl.parentElement) { // video element already placed
          if (videoEl.src === video.link.replace("staging.", "")) { // video element currently playing correct video
            videoEl.remove();
            videoButton.classList.remove("active");
          } else {
            videoEl.src = video.link.replace("staging.", ""); // video element currently playing another video
            videoEl.play();
            highlight_active(target, videoButton);
          }
        } else { // video element not yet placed
          videoEl.src = video.link.replace("staging.", "");
          videoEl.autoplay = true;
          target.appendChild(videoEl);
          highlight_active(target, videoButton);
        }
      });

      target.appendChild(videoButton);
    });
  },

  insertThemeEntry(target: Element, theme: AnimeThemeEntry) {
    const el = document.createElement("div");
    el.classList.add("lichtThemeEntry");

    // VERSION
    if (theme.version) {
      const version = document.createElement("div");
      version.innerText = "v" + theme.version;
      version.classList.add("lichtTag");
      el.appendChild(version);
    }

    // EPISODES
    if (theme.episodes) {
      const episodes = document.createElement("div");
      episodes.innerText = "Episode(s): " + theme.episodes;
      episodes.classList.add("lichtTag");
      el.appendChild(episodes);
    }

    // NSFW
    if (theme.nsfw) {
      const nsfw = document.createElement("div");
      nsfw.innerText = "NSFW";
      nsfw.classList.add("lichtTag");
      el.appendChild(nsfw);
    }

    // SPOILER
    if (theme.spoiler) {
      const spoiler = document.createElement("div");
      spoiler.innerText = "Spoiler";
      spoiler.classList.add("lichtTag");
      el.appendChild(spoiler);
    }

    // VIDEOS
    const videos = document.createElement("div");

    this.insertVideos(videos, theme.videos);
    //const videosElement = new VideosElement(videos, theme.videos);

    //theme.videos.forEach((video) => this.insertVideo(videos, video));

    el.appendChild(videos);

    target.appendChild(el);
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
    slug.innerText = theme.slug;

    // SONG
    const song = document.createElement("span");
    song.innerText = theme.song.title || "";

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

      artist.innerHTML = "<b>Artist(s):</b> " +
        theme.song.artists!.map(artist_to_string).join(", ");

      el.append(artist);
    }

    theme.animethemeentries.forEach((entry) =>
      this.insertThemeEntry(el, entry)
    );

    target.append(el);
  },

  insertThemes(
    target: Element,
    themes: AnimeTheme[],
    heading: string,
    pos: number,
  ) {
    const container = document.createElement("div");
    container.appendChild(document.createElement("h2"));
    (container.children[0] as HTMLElement).innerText = heading;
    container.classList.add("lichtContainer");

    if (!themes || themes.length == 0) {
      const el = document.createElement("div");
      el.innerText = "Nothing found";
      container.appendChild(el);
    }

    themes.forEach((theme: AnimeTheme) => {
      this.insertTheme(container, theme);
    });

    target.insertBefore(container, target.children[pos]);
  },

  addTo(target: Element, data: AnisongsData) {
    this.insertThemes(target, data.ops, "Openings", 0);
    this.insertThemes(target, data.eds, "Endings", 1);
  },

  clean(target: Element) {
    target.querySelectorAll(".lichtContainer").forEach((e) =>
      target.removeChild(e)
    );
  },
};

export default AnisongsDOM;
