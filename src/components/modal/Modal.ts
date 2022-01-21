import Component from "../../component";
import { renderRoot } from "../../render";
import tmpl from "./modal.hbs";
import * as cn from "./modal.module.scss";

type Props = {
  content: Component;
};

class Modal extends Component<Props> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);
  }

  componentDidMount() {
    const listener = (e: MouseEvent) => {
      const path = getElementPath(e.target as Element);
      if (!this.element) return;
      const target = this.element.querySelector(`.${cn.modal}`);
      if (!target) return;
      if (path.includes(target)) return;
      this.remove();
      document.removeEventListener("mousedown", listener);
    };
    document.addEventListener("mousedown", listener);
  }
}

function getElementPath(element: Element) {
  const path: Element[] = [];
  let currentElement: Element | null = element;
  while (currentElement) {
    path.push(currentElement);
    currentElement = currentElement.parentElement;
  }
  return path;
}

export function removeModals() {
  document.querySelectorAll(`.${cn.wrapper}`).forEach((el) => el.remove());
}

export function renderModal(content: any, clickEvent?: MouseEvent) {
  if (clickEvent) {
    clickEvent.stopPropagation();
  }
  const modal = new Modal({ content });
  renderRoot(modal);
  return modal.element;
}
