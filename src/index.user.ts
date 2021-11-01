import { useScripts } from "./global";
import modules from "./modules";

let oldUrl = "";

(async function () {
  const observer = new MutationObserver(() => {
    const pathname = window.location.pathname;
    if (pathname !== oldUrl) {
      console.log("lichtHikari: switched page " + pathname);

      modules.forEach((module) => {
        if (useScripts[module.id] && module.urlMatch(pathname, oldUrl)) {
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
