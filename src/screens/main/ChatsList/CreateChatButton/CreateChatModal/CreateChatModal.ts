import Component from "../../../../../component";
import { Button, Input, removeModals } from "../../../../../components";
import { chatsController } from "../../../../../controllers";
import tmpl from "./createChatModal.hbs";
import cn from "./createChatModal.module.scss";

type InnerProps = {
  chatTitleInput: Input;
  confirmBtn: Button;
};

type State = {
  title: string;
};

export default class LogoutModalContent extends Component<
  {},
  State,
  InnerProps
> {
  cn = cn;

  constructor() {
    super(tmpl);

    this.state = { title: "" };

    this.innerProps.chatTitleInput = new Input({
      placeholder: "Название чата",
      shouldFocusAfterRender: true,
      handleInput: (e) => {
        this.setState({ title: e.target.value });
        this.props.chatTitleInput.focus();
      },
      value: this.state.title,
    });

    this.innerProps.confirmBtn = new Button({
      text: "Создать",
      type: "primary",
      getDisabled: () => {
        return !this.state.title;
      },
      onClick: () => {
        chatsController.createChat({ title: this.state.title }).then(() => {
          removeModals();
        });
      },
    });
  }
}
