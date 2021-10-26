import localforage from "localforage";
import modules from "./modules";

localforage.config({
  name: "lichtHikari",
});

let oldUrl = "";

(async function () {
  const observer = new MutationObserver(() => {
    const pathname = window.location.pathname;
    if (pathname !== oldUrl) {
      console.log("lichtHikari: switched page " + pathname);

      modules.forEach((module) => {
        if (module.urlMatch(pathname, oldUrl)) {
          module.code();
        }
      });

      oldUrl = pathname;
    }
  });

  observer.observe(document.querySelector("head > title")!, {
    childList: true,
    subtree: true,
  });
})();
