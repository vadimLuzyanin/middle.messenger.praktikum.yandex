export default function renderScreen(screen, callback) {
  const container = document.getElementById("app");
  container.innerHTML = screen;
  callback(container.firstChild);
}
