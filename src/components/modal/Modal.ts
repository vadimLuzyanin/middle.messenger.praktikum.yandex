import { renderRoot } from "../../index";
import Component from "../../component";
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
      if (this.element) {
        const target = this.element.querySelector(`.${cn.modal}`);
        if (target) {
          if (!path.includes(target)) {
            this.remove();
            document.removeEventListener("click", listener);
          }
        }
      }
    };
    document.addEventListener("click", listener);
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

export default function renderModal(
  content: Component<any, any>,
  clickEvent?: MouseEvent
) {
  if (clickEvent) {
    clickEvent.stopPropagation();
  }
  const modal = new Modal({ content });
  renderRoot(modal);
}
