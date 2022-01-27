import Component from "../../component";
import { BlockProps } from "../../types";
import tmpl from "./button.hbs";
import cn from "./button.module.scss";

type Props = BlockProps & {
  text: string;
  type: "primary" | "secondary" | "warn";
  leftAlign?: boolean;
  getDisabled?: () => boolean;
  name?: string;
};

export default class Button extends Component<Props> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);
  }

  componentDidMount() {
    if (this.props.getDisabled) {
      (this.element as HTMLButtonElement).disabled = this.props.getDisabled();
    }
  }

  componentDidUpdate() {
    if (this.props.getDisabled) {
      (this.element as HTMLButtonElement).disabled = this.props.getDisabled();
    }
  }
}
