const MangaDexButtonDOM = {
  createButton(mediaTitle: string): Element {
    const link = document.createElement("a");
    link.classList.add("external-link");
    link.classList.add("mangadex");
    link.href = `https://mangadex.org/titles?q=${mediaTitle}`;
    link.target = "_blank";
    link.textContent = "MangaDex";

    return link;
  },
  addTo(container: Element, mediaTitle: string) {
    container.append(MangaDexButtonDOM.createButton(mediaTitle));
    console.log("button added");
  },
  clean(container: Element) {
    for (const el of container.querySelectorAll(".external-link.mangadex")) {
      el.remove();
    }
  },
};

export default MangaDexButtonDOM;
