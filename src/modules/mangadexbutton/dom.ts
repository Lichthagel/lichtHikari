import { Manga } from "./models";

const MangaDexButtonDOM = {
    createButton(mediaTitle: string): Element {
        const link = document.createElement("a");
        link.classList.add("external-link");
        link.classList.add("mangadex");
        link.href = `https://mangadex.org/titles?q=${mediaTitle}`;
        link.target = "_blank";
        link.innerText = "MangaDex";

        return link;
    },
    addTo(container: Element, mediaTitle: string) {
        container.appendChild(this.createButton(mediaTitle));
        console.log("button added");
    },
    clean(container: Element) {
        container.querySelectorAll(".external-link.mangadex").forEach(el => el.remove());
    }
}

export default MangaDexButtonDOM;