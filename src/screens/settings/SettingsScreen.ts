import Component from "../../component";
import tmpl from "./screen.hbs";
import cn from "./settings.module.scss";
import backIcon from "./assets/back.svg";
import avatar from "./assets/defaultAvatar.svg";
import { ViewSettings } from "./ViewSettings";
import { EditPassword } from "./EditPassword";
import { EditData } from "./EditData";
import { renderModal, removeModals } from "../../components";
import { gotoRoute } from "../../router";
import { ScreensPathnames } from "../../constants";
import { AppState } from "../../store";
import { userSettingsController } from "../../controllers";

type InnerProps = {
  viewSettings: ViewSettings;
  editData: EditData;
  editPassword: EditPassword;
  backIcon: string;
};

type State = {
  currentComponent: ViewSettings | EditData | EditPassword;
  avatarWithHover: boolean;
  avatar: string;
};

function mapStoreToState(state: AppState) {
  if (state.user?.avatar) {
    return {
      avatar: state.user.avatar,
      isLoggedIn: state.isLoggedIn,
    };
  }
  return { isLoggedIn: state.isLoggedIn };
}

export default class SettingsScreen extends Component<{}, State, InnerProps> {
  cn = cn;

  listeners: { avatar?: (e: Event) => void; goBack?: () => void } = {};

  constructor() {
    super(tmpl, {}, mapStoreToState);

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
    this.innerProps.backIcon = backIcon;

    this.state = {
      currentComponent: this.props.viewSettings,
      avatarWithHover: true,
      avatar: this.state.avatar || avatar,
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
            const modalElement = renderModal(
              "<input type='file' name='avatarInput' accept='image/*' />",
              e as MouseEvent
            );
            const avatarInput = modalElement?.querySelector(
              "input[name=avatarInput]"
            );
            if (avatarInput) {
              avatarInput.addEventListener("change", (e) => {
                const target = <HTMLInputElement>e.target;
                const file = target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append("avatar", file, file.name);
                  userSettingsController.changeAvatar(formData).then(() => {
                    removeModals();
                  });
                }
              });
            }
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
              gotoRoute(ScreensPathnames.Messenger);
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
