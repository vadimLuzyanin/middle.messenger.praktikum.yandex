export function renderToString(component, props) {
  const { tmpl, cn } = component;
  return tmpl({ cn, ...props });
}

export function createElement(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
