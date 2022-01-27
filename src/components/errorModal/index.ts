import { Button } from "../button";
import { removeModals, renderModal } from "../modal";
import Component from "../../component";
import tmpl from "./modalContent.hbs";
import cn from "./modalContent.module.scss";

type Props = {
  message: string;
};

type InnerProps = {
  okButton: Button;
};

class ErrorModal extends Component<Props, {}, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);
    this.innerProps.okButton = new Button({
      text: "Закрыть",
      type: "primary",
      onClick: () => removeModals(),
    });
  }
}

export default function renderErrorModal(message: string) {
  const content = new ErrorModal({ message });
  removeModals();
  renderModal(content);
}
