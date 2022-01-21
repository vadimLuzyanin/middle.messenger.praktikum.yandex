import { User } from "../../../../api/types";
import Component from "../../../../component";
import { Button, Input } from "../../../../components";
import { removeModals } from "../../../../components/modal";
import chatsController from "../../../../controllers/chatsController";
import getUserController from "../../../../controllers/getUserController";
import tmpl from "./actionModal.hbs";
import * as cn from "./actionModal.module.scss";

type InnerProps = {
  loginInput: Input;
  confirmBtn: Button;
  text: string;
};

type Props = {
  type: "add" | "remove";
  chatId: number;
};

type State = {
  login: string;
  users: User[];
};

export default class ActionModal extends Component<Props, State, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.state = { login: "", users: [] };

    if (this.props.type === "add") {
      this.innerProps.text = "Добавить пользователей";
    } else {
      this.innerProps.text = "Удалить пользователей";
    }

    this.innerProps.loginInput = new Input({
      autofocus: true,
      placeholder: "Логин",
      value: this.state.login,
      errorMessage: "Пользователи не найдены",
      getIsNotValid: () => {
        return this.state.users.length === 0;
      },
      handleInput: (e) => {
        const { value: login } = e.target;
        getUserController.searchUsers({ login }).then((users) => {
          if (typeof users === "object") {
            this.setState({ users, login });
            this.innerProps.loginInput.focus();
          } else {
            this.setState({ login });
            this.innerProps.loginInput.focus();
          }
        });
      },
    });

    this.innerProps.confirmBtn = new Button({
      text: this.props.type === "add" ? "Добавить" : "Удалить",
      type: "primary",
      getDisabled: () => {
        return !this.state.login || this.state.users.length === 0;
      },
      onClick: () => {
        const usersIds = this.state.users.map((user) => user.id);
        if (this.props.type === "add") {
          chatsController
            .addUsers({
              users: usersIds,
              chatId: this.props.chatId,
            })
            .then(() => {
              removeModals();
            });
        } else {
          chatsController
            .deleteUsers({
              users: usersIds,
              chatId: this.props.chatId,
            })
            .then(() => {
              removeModals();
            });
        }
      },
    });
  }
}