import Component from "../../component";
import tmpl from "./screen.hbs";
import * as cn from "./settings.module.scss";
import ViewSettings from "./ViewSettings";
import backIcon from "./assets/back.svg";
import avatar from "./assets/defaultAvatar.svg";
import EditPassword from "./EditPassword";
import EditData from "./EditData";
import { Button, renderModal } from "../../components";
import { pushPathname } from "../../index";

type Props = {
  viewSettings: ViewSettings;
  editData: EditData;
  editPassword: EditPassword;
  avatar: string;
  backIcon: string;
};

type State = {
  currentComponent: Component<any, any>;
};

export default class SettingsScreen extends Component<Props, State> {
  cn = cn;

  constructor() {
    super(tmpl);

    this.props.viewSettings = new ViewSettings({
      onChangePasswordClick: () => {
        this.switchContent(this.props.editPassword);
      },
      onChangeDataClick: () => {
        this.switchContent(this.props.editData);
      },
    });
    this.props.editPassword = new EditPassword({
      onSaveClick: () => this.switchContent(this.props.viewSettings),
    });
    this.props.editData = new EditData({
      onSaveClick: () => this.switchContent(this.props.viewSettings),
    });
    this.props.avatar = avatar;
    this.props.backIcon = backIcon;

    this.state = {
      currentComponent: this.props.viewSettings,
    };
  }

  switchContent(content: Component<any, any>) {
    this.setState((prev) => ({ ...prev, currentComponent: content }));
  }

  componentDidMount() {
    if (this.element) {
      const avatar = this.element.querySelector(`.${cn.avatarContainer}`);
      if (avatar) {
        avatar.addEventListener("click", (e) => {
          renderModal(
            new Button({
              text: "Тут будет инпут для аватарки",
              type: "primary",
            }),
            e as MouseEvent
          );
        });
      }
      const goBackButton = this.element.querySelector(`.${cn.back}`);
      if (goBackButton) {
        goBackButton.addEventListener("click", () => {
          pushPathname("/");
        });
      }
    }
  }

  componentDidUpdate() {
    if (this.element) {
      const avatar = this.element.querySelector(`.${cn.avatarContainer}`);
      if (avatar) {
        avatar.addEventListener("click", (e) => {
          renderModal(
            new Button({
              text: "Тут будет инпут для аватарки",
              type: "primary",
            }),
            e as MouseEvent
          );
        });
      }
      const goBackButton = this.element.querySelector(`.${cn.back}`);
      if (goBackButton) {
        goBackButton.addEventListener("click", () => {
          pushPathname("/");
        });
      }
    }
  }
}
