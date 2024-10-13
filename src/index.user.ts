import { activeModules } from "./global";
import modules from "./modules";

let oldUrl = "";

const observer = new MutationObserver(() => {
  const pathname = globalThis.location.pathname;
  if (pathname !== oldUrl) {
    console.log(`lichtHikari: switched page ${pathname}`);

    for (const module of modules) {
      if (activeModules[module.id] && module.urlMatch(pathname, oldUrl)) {
        void module.code();
      }
    }

    oldUrl = pathname;
  }
});

observer.observe(document.querySelector("head > title")!, {
  childList: true,
  subtree: true,
});
