const AWCListsDOM = {
  addTo(target: Element, data: string[]) {
    const dataSet = document.createElement("div");
    dataSet.classList.add("lichtAWCListsSet");

    const type = document.createElement("div");
    type.classList.add("lichtAWCListsType");
    type.innerText = "AWC Lists";

    dataSet.appendChild(type);

    const value = document.createElement("div");
    value.classList.add("lichtAWCListsValue");
    value.innerText = (data && data.length > 0) ? data.join(", ") : "None";

    dataSet.appendChild(value);

    target.appendChild(dataSet);
  },
  clean(target: Element) {
    target.querySelectorAll(".lichtAWCListsSet").forEach((e) => e.remove());
  },
};

export default AWCListsDOM;
