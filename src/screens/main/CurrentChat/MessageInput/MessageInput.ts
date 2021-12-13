import Component from "../../../../component";
import * as cn from "./messageInput.module.scss";
import tmpl from "./messageInput.hbs";

export default class MessageInput extends Component {
  cn = cn;

  constructor() {
    super(tmpl);
  }

  getSendButton() {
    return this.element?.querySelector(`.${cn.sendButton}`);
  }

  getAttachButton() {
    return this.element?.querySelector(`.${cn.attachButton}`);
  }
}
