import Component from "../../../component";

import tmpl from "./searchInput.hbs";
import * as cn from "./searchInput.module.scss";

export default class SearchInput extends Component {
  cn = cn;
  
  eventTargetSelector = "input";

  constructor() {
    super(tmpl);
  }
}
