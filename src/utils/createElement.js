export default function createElement(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const root = div.firstChild;
  div.remove();
  return root;
}
