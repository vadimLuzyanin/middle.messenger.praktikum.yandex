import "./helpers";
import { router } from "./router";
import {
  LoginScreen,
  MainScreen,
  RegisterScreen,
  Screen404,
  Screen500,
  SettingsScreen,
} from "./screens";

// export function pushPathname(pathname: string) {
//   if (document.location.pathname !== pathname) {
//     window.history.pushState(null, "", pathname);
//     render();
//   }
// }

export default function init() {
  router
    .use("/", MainScreen)
    .use("/login", LoginScreen)
    .use("/register", RegisterScreen)
    .use("/settings", SettingsScreen)
    .use("/500", Screen500)
    .use("*", Screen404)
    .start();
  // clearRoot();
  // renderRoot(component);
  // const { pathname } = document.location;
  // switch (pathname) {
  //   case "/":
  //   case "/index.html": {
  //     renderRoot(new MainScreen());
  //     break;
  //   }
  //   case "/login": {
  //     renderRoot(new LoginScreen());
  //     break;
  //   }
  //   case "/register": {
  //     renderRoot(new RegisterScreen());
  //     break;
  //   }
  //   case "/settings": {
  //     renderRoot(new SettingsScreen());
  //     break;
  //   }
  //   case "/500": {
  //     renderRoot(
  //       new ErrorScreen({ description: "Мы уже фиксим", title: "500" })
  //     );
  //     break;
  //   }
  //   case "/404":
  //   default: {
  //     renderRoot(
  //       new ErrorScreen({ description: "Не туда попали", title: "404" })
  //     );
  //   }
  // }
}

init();
