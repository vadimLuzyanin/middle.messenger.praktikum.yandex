import { ValidRouterPathname } from "../types";
import router from "./router";

export default function gotoRoute(pathname: ValidRouterPathname) {
  router.go(pathname);
}
