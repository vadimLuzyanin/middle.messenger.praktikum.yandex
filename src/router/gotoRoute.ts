import router from "./router";

export default function gotoRoute(pathname: string) {
  router.go(pathname);
}
