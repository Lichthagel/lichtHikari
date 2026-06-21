import { activeModules } from "./global";
import modules from "./modules";

let oldUrl = "";

const observer = new MutationObserver(() => {
  const pathname = globalThis.location.pathname;
  if (pathname !== oldUrl) {
    console.log(`lichtHikari: switched page ${pathname}`);

    for (const module of modules) {
      if (activeModules()[module.id] === true && module.urlMatch(pathname, oldUrl)) {
        void module.code();
      }
    }

    // eslint-disable-next-line unicorn/no-top-level-assignment-in-function
    oldUrl = pathname;
  }
});

observer.observe(document.head, {
  childList: true,
  subtree: true,
});
