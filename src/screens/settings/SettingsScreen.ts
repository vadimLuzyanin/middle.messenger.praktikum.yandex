import Component from "../../component";
import tmpl from "./screen.hbs";
import * as cn from "./settings.module.scss";
import backIcon from "./assets/back.svg";
import avatar from "./assets/defaultAvatar.svg";
import { ViewSettings } from "./ViewSettings";
import { EditPassword } from "./EditPassword";
import { EditData } from "./EditData";
import { Button, renderModal } from "../../components";
import { gotoRoute } from "../../router";
import { ScreensPathnames } from "../../constants";

type InnerProps = {
  viewSettings: ViewSettings;
  editData: EditData;
  editPassword: EditPassword;
  avatar: string;
  backIcon: string;
};

type State = {
  currentComponent: ViewSettings | EditData | EditPassword;
  avatarWithHover: boolean;
};

export default class SettingsScreen extends Component<{}, State, InnerProps> {
  cn = cn;

  listeners: { avatar?: (e: Event) => void; goBack?: () => void } = {};

  constructor() {
    super(tmpl);

    this.innerProps.viewSettings = new ViewSettings({
      onChangePasswordClick: () => {
        this.switchContent(this.props.editPassword);
      },
      onChangeDataClick: () => {
        this.switchContent(this.props.editData);
      },
    });
    this.innerProps.editPassword = new EditPassword({
      onSaveClick: () => this.switchContent(this.props.viewSettings),
    });
    this.innerProps.editData = new EditData({
      onSaveClick: () => this.switchContent(this.props.viewSettings),
    });
    this.innerProps.avatar = avatar;
    this.innerProps.backIcon = backIcon;

    this.state = {
      currentComponent: this.props.viewSettings,
      avatarWithHover: true,
    };
  }

  switchContent(content: typeof this.state.currentComponent) {
    this.setState((prev) => ({
      ...prev,
      currentComponent: content,
      avatarWithHover: content === this.props.viewSettings,
    }));
  }

  bindListeners() {
    if (this.element) {
      const avatar = this.element.querySelector(`.${cn.avatarContainer}`);
      if (avatar) {
        const listener = (e: Event) => {
          if (this.state.currentComponent === this.props.viewSettings) {
            renderModal(
              new Button({
                text: "Тут будет инпут для аватарки",
                type: "primary",
              }),
              e as MouseEvent
            );
          }
        };
        this.listeners.avatar = listener;
        avatar.addEventListener("click", listener);
      }
      const goBackButton = this.element.querySelector(`.${cn.back}`);
      if (goBackButton) {
        const listener = () => {
          switch (this.state.currentComponent) {
            case this.props.viewSettings: {
              gotoRoute(ScreensPathnames.messenger);
              break;
            }
            default: {
              this.switchContent(this.props.viewSettings);
            }
          }
        };

        this.listeners.goBack = listener;
        goBackButton.addEventListener("click", listener);
      }
    }
  }

  removeListeners() {
    if (this.element) {
      if (this.listeners.avatar) {
        const avatar = this.element.querySelector(`.${cn.avatarContainer}`);
        if (avatar) {
          avatar.removeEventListener("click", this.listeners.avatar);
        }
      }
      if (this.listeners.goBack) {
        const goBackButton = this.element.querySelector(`.${cn.back}`);
        if (goBackButton) {
          goBackButton.removeEventListener("click", this.listeners.goBack);
        }
      }
    }
  }

  componentDidMount() {
    this.removeListeners();
    this.bindListeners();
  }

  componentDidUpdate() {
    this.removeListeners();
    this.bindListeners();
  }
}
