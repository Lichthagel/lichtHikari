const AWCListsDOM = {
  addTo(target: Element, data: string) {
    const dataSet = document.createElement("div");
    dataSet.classList.add("lichtAWCListsSet");

    const type = document.createElement("div");
    type.classList.add("lichtAWCListsType");
    type.textContent = "AWC Lists";

    dataSet.append(type);

    const value = document.createElement("div");
    value.classList.add("lichtAWCListsValue");
    value.textContent = data;

    dataSet.append(value);

    target.append(dataSet);
  },
  clean(target: Element) {
    for (const e of target.querySelectorAll(".lichtAWCListsSet")) {
      e.remove();
    }
  },
};

export default AWCListsDOM;
