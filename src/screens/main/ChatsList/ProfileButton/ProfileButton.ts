import Component from "../../../../component";
import { gotoRoute } from "../../../../router";
import tmpl from "./profileButton.hbs";
import * as cn from "./profileButton.module.scss";

export default class ProfileButton extends Component {
  cn = cn;

  constructor() {
    super(tmpl);
    this.innerProps.onClick = () => {
      gotoRoute("/settings");
    };
  }
}
