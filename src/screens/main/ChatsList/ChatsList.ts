import Component from "../../../component";
import { Chat } from "../types";
import ChatCard from "./ChatCard";

import tmpl from "./chatsList.hbs";
import * as cn from "./chatsList.module.scss";
import ProfileButton from "./ProfileButton";
import SearchInput from "./SearchInput";

type Props = {
  onSelect: (id: number) => void;
  chats: Chat[];
};
type State = { selected: ChatCard | null; scrollPosition: number };
type InnerProps = {
  profileBtn: ProfileButton;
  searchInput: SearchInput;
  cards: { id: number; component: ChatCard }[];
  cardsComponents: ChatCard[];
};

export default class ChatsList extends Component<Props, State, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.state = { selected: null, scrollPosition: 0 };

    this.innerProps.profileBtn = new ProfileButton();
    this.innerProps.searchInput = new SearchInput();
    this.innerProps.cards = this.props.chats.map((chat) => ({
      id: chat.id,
      component: new ChatCard({ ...chat }),
    }));
    this.innerProps.cardsComponents = this.innerProps.cards.map(
      (card) => card.component
    );
    this.innerProps.cards.forEach((card) => {
      // eslint-disable-next-line no-param-reassign
      card.component.outerProps.onClick = () => {
        this.setState({
          selected: card.component,
          scrollPosition: this.getScrollableElement()?.scrollTop,
        });
        this.props.onSelect(card.id);
      };
    });
  }

  getScrollableElement() {
    return this.element?.querySelector(`.${cn.cards}`);
  }

  componentDidUpdate() {
    const selected = this.innerProps.cards.find(
      (card) => card.component === this.state.selected
    );
    const notSelected = this.innerProps.cards.filter(
      (card) => card.component !== this.state.selected
    );
    if (selected) {
      selected.component.outerProps.selected = true;
    }
    notSelected.forEach((card) => {
      // eslint-disable-next-line no-param-reassign
      card.component.outerProps.selected = false;
    });

    const scrollable = this.getScrollableElement();
    if (scrollable) {
      scrollable.scrollTop = this.state.scrollPosition;
    }
  }
}
