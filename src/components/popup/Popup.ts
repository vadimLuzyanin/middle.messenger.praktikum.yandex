import Component from "../../component";
import tmpl from "./popup.hbs";
import * as cn from "./popup.module.scss";

type Props = {
  rootElement: HTMLElement;
  indent: number;
  text: string;
  hidden?: boolean;
  warn?: boolean;
};

export default class Popup extends Component<Props> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);
  }

  positionPopup() {
    if (this.element) {
      const rootRect = this.props.rootElement.getBoundingClientRect();
      const popupRect = this.element.getBoundingClientRect();

      let top = rootRect.bottom + this.props.indent;

      if (top + popupRect.height > document.documentElement.clientHeight) {
        top = rootRect.top - popupRect.height - this.props.indent;
      }

      this.element.style.top = `${top}px`;
    }
  }

  show() {
    if (this.element) {
      this.element.style.opacity = "1";
    }
  }

  hide() {
    if (this.element) {
      this.element.style.opacity = "0";
    }
  }

  componentDidMount() {
    this.positionPopup();
  }

  componentDidUpdate() {
    this.positionPopup();
  }
}
