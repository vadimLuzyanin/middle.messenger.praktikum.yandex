export default function pushPathname(pathname) {
  if (document.location.pathname !== pathname) {
    window.history.pushState(null, "", pathname);
  }
}
