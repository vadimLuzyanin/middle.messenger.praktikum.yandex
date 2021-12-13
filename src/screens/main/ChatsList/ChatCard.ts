import Component from "../../../component";
import { BlockProps } from "../../../types";
import tmpl from "./chatCard.hbs";
import * as cn from "./chatCard.module.scss";

type Props = BlockProps & {
  messageAuthor: string;
  messageContent: string;
  avatar?: string;
  lastUpdated: string;
  notify?: number;
  selected?: boolean;
};

export default class ChatCard extends Component<Props> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);
  }
}
