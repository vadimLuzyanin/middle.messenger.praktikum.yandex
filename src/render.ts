import Component from "./component";

export function renderRoot(block: Component<any, any, any>) {
  const root = document.getElementById("app");
  if (root) {
    root.appendChild(block.render());
  }
  block.dispatchComponentDidMount();
}

export function clearRoot() {
  const root = document.getElementById("app");
  if (root) {
    root.innerHTML = "";
  }
}