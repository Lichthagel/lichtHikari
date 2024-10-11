export function createAWCButton(challenger: string) {
  const buttonEl = document.createElement("a");
  buttonEl.classList.add("lichtAWCButton");
  buttonEl.textContent = "AWC Profile";
  buttonEl.href = `https://awc.moe/challenger/${challenger}`;
  buttonEl.target = "_blank";

  return buttonEl;
}
