export default function appendChilds(root, childs) {
  childs.forEach((child) => {
    root.appendChild(child);
  });
}
