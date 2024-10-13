export const waitForElement = async (selector: (container: Document) => Element | null | undefined, container = document, timeoutSecs = 7): Promise<Element> => new Promise((resolve, reject) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        const element = selector(container);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      }
    }
  });

  observer.observe(container, {
    childList: true,
    subtree: true,
  });

  setTimeout(() => {
    observer.disconnect();
    reject(new Error("Timed out waiting for element"));
  }, timeoutSecs * 1000);
});

export const getDataAttrName = (target: Element): string | null => {
  for (const attr of target.attributes) {
    if (attr.name.startsWith("data-v-")) {
      return attr.name;
    }
  }

  return null;
};

export const getExtraAttrs =
(dataAttrName: string | null): Record<string, string> =>
  dataAttrName ? { [dataAttrName]: "" } : {};
