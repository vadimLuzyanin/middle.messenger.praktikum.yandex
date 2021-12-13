import Component from "../../component";
import { Button } from "../../components";
import tmpl from "./logoutModalContent.hbs";
import * as cn from "./logoutModalContent.module.scss";

type InnerProps = {
  logoutBtn: Button;
  cancelBtn: Button;
};

type Props = {
  onLogoutClick: () => void;
  onCancelClick: () => void;
};

export default class LogoutModalContent extends Component<
  Props,
  {},
  InnerProps
> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.innerProps.logoutBtn = new Button({
      text: "Выйти",
      type: "warn",
      onClick: () => this.props.onLogoutClick(),
    });

    this.innerProps.cancelBtn = new Button({
      text: "Нет, не выходить",
      type: "primary",
      onClick: () => this.props.onCancelClick(),
    });
  }
}
